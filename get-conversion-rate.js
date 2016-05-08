'use strict';

var jsdom = require('jsdom'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 3000;

/* CORS middleware, allow to errbody */
router.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function(req, res){
	res.json({ message : 'api is up and running!' });
});

router.get('/convert', function(req, res){

	var sellCurrency = (req.query.sellCurrency) ? req.query.sellCurrency : '',
		buyCurrency = (req.query.buyCurrency) ? req.query.buyCurrency : '',
		sendQ = (sellCurrency.length && buyCurrency.length) ? sellCurrency + ' to ' + buyCurrency + ' currency' : '';

	if (!sendQ.length){
		res.status(400).send('naa b, check your params, something\'s not right..');
		return false;
	}

	jsdom.env({
	    url: "https://www.google.com/search?q=" + encodeURI(sendQ),
	    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
	    done: function(err, window) {

	    	if (err){
	    		res.status(500).send(err);
	    		return false;
	    	}

	    	var values = [].slice.call(window.document.getElementsByClassName('ccw_data')),
	    		selections = [].slice.call(window.document.getElementsByClassName('ccw_unit_selector')),
	    		i = 0,
	    		resultObj = { sellCurrency : { value : 0, currency : '' }, buyCurrency : { value : 0, currency : '' } },
	    		populateObj = function(key, value, currency){
		    		resultObj[key].value = value;
		    		resultObj[key].currency = currency;
		    	};

		   	if (!values.length){
		   		res.status(500).send('my bad, could not convert this, just use google bruh');
		   		return false;
		   	}

	    	values.forEach(function(val){
	    		var key = (i === 0) ? 'sellCurrency' : 'buyCurrency',
	    			selectedName = selections[i].firstChild.innerHTML;
	    		populateObj(key, val.value, selectedName + ' (' + selections[i].value + ')')
	    		i++;
	    	});

	    	window.close();

	    	res.send(resultObj);

	    }
	});

});

app.use('/api', router);

app.listen(port);

console.log('listening on port ' + port);