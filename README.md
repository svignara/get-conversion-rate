# get-conversion-rate
Simple API that will get the conversion rate from one currency to another

---

## What does this API do?

It basically scrapes a Google search result page, when you search for how much a value in one currency would be in another, ie: "500 Canadian in US". It returns it in a nice JSON format though, for use in any application. See below on samples of how to use the API.

### API call `/api/convert`

#### Sample data to pass to get base rate

How to structure request data:

```javascript
{
	sellCurrency : 'Canada',
	buyCurrency : 'US'
}
```

or just simply `GET: /api/convert?sellCurrency=Canada&buyCurrency=US`

This will return:

```javascript
{
	"sellCurrency": {
		"value" : "1",
		"currency":"Canadian Dollar (CAD)"
	},
	"buyCurrency" : {
		"value" : "0.77",
		"currency" : "US Dollar (USD)"
	}
}
```
(goddamn Canadian dollar is doing horrible at the time of writing, smh)

#### Sample data to pass to convert value

Very similar to base rate request data structure, you just simply add the value to the front - like so:

```javascript
{
	sellCurrency : '500 Canada',
	buyCurrency : 'US'
}
```

or.. `GET: /api/convert?sellCurrency=500+Canada&buyCurrency=US`

This will return:

```javascript
{
    "sellCurrency": {
        "value": "500",
        "currency": "Canadian Dollar (CAD)"
    },
    "buyCurrency": {
        "value": "387.34",
        "currency": "US Dollar (USD)"
    }
}
```

---

### TODO:
* API documentation
* ~~Rename route `/api/convert` to `/api/conversion_rate`~~ no need for this (see note below for why)
* ~~Create new `/api/convert` route that accepts a `fromCntry`, `toCntry` and `value` (of the `fromCntry`) as parameters and responds back with converted `value` (of the `toCntry`).~~ forgot I'm just passing the search to google, so google can handle if I pass a value, and will return the correct converted value