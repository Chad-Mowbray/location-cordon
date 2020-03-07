## location-cordon

An overly strict location-header restrictor.  Cleans input of CRLF characters to prevent HTTP header splitting attacks.  Uses both white/black listing.

## Basic Usage
```javascript
let goodLocationString = "/myurl?myKey=myValue"
const sanitizedLocationHeader = sanitizeLocationHeader(goodLocationString)
// Everything's fine
res.setHeader('location', sanitizedLocationHeader);
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Foo', 'bar');
res.writeHead(200, { 'Content-Type': 'text/plain' });
```

```javascript
let badLocationString = "/myurl?myKey=myValue%0d%0a%0d%0a<script>alert(document.domain)</script>"
const sanitizedLocationHeader = sanitizeLocationHeader(badLocationString)
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
let goodLocationString = "/myurl"
let myCustomRegex = ["[^a-z/]", "g"]  // Only allow the letters a through z and the forward slash
const sanitizedLocationHeader = sanitizeLocationHeader(goodLocationString, myCustomRegex)
res.setHeader('location', sanitizedLocationHeader);
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Foo', 'bar');
res.writeHead(200, { 'Content-Type': 'text/plain' });
```