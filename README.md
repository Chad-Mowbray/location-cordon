[![Build Status](https://travis-ci.com/Chad-Mowbray/location-cordon.svg?branch=master)](https://travis-ci.com/Chad-Mowbray/location-cordon)

# location-cordon

An overly strict location-header restrictor.  Cleans input of CRLF characters to prevent HTTP header splitting attacks.  Throws an error on invalid input.  Uses both white/black listing.  No dependencies.

## Basic Usage
```javascript
let lc = require('location-cordon')

let goodLocationString = "/myurl?myKey=myValue"
const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString)
// Everything's fine
res.setHeader('location', sanitizedLocationHeader);
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Foo', 'bar');
res.writeHead(200, { 'Content-Type': 'text/plain' });
```

```javascript
let lc = require('location-cordon')

let badLocationString = "/myurl?myKey=myValue%0d%0a%0d%0a<script>alert(document.domain)</script>"
const sanitizedLocationHeader = lc.checkLocationHeader(badLocationString)
// Error: Invalid Input
    // res.setHeader('location', sanitizedLocationHeader);
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('X-Foo', 'bar');
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
```


## Custom Usage (optional)
The function takes a second optional parameter: a regexp array.  The first element is the regexp string; the second (optional) element is a flag string.

Note: the regex should be the inverse of allowable matches

```javascript
let lc = require('location-cordon')

let goodLocationString = "/myurl"
let myCustomRegex = ["[^a-z/]", "g"]  // Only allow the letters a through z and the forward slash
const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString, myCustomRegex)
res.setHeader('location', sanitizedLocationHeader);
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Foo', 'bar');
res.writeHead(200, { 'Content-Type': 'text/plain' });
```