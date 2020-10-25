const lc = require('./index.js')


test('Returns INPUT when INPUT is valid', () => {
    let goodLocationString = "/myurl?myKey=myValue1"
    const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString)
    expect(sanitizedLocationHeader).toBe(goodLocationString);
});


test('Returns INPUT without CRLF when INPUT is valid', () => {
    let goodLocationString = "/myurl\r\n"
    let cleanedLocationString = "/myurl"
    const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString)
    expect(sanitizedLocationHeader).toBe(cleanedLocationString);
});


test('Throws an error when INPUT is invalid', () => {
    expect(() => {
        let badLocationString = "/myurl?myKey=myValue%0d%0a%0d%0a<script>alert(document.domain)</script>"
        const sanitizedLocationHeader = lc.checkLocationHeader(badLocationString)
        return sanitizedLocationHeader
    }).toThrow();
});


test('Returns INPUT when INPUT is valid when custom regex is provided', () => {
    let goodLocationString = "/myurl"
    let myCustomRegex = ["[^a-z/]", "g"]  // Only allow the letters a through z and the forward slash
    const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString, myCustomRegex)
    expect(sanitizedLocationHeader).toBe(goodLocationString);
});


test('Returns INPUT when INPUT is valid when custom regex without flag is provided', () => {
    let goodLocationString = "/myurl"
    let myCustomRegex = ["[^a-z/]"]  // no global flag
    const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString, myCustomRegex)
    expect(sanitizedLocationHeader).toBe(goodLocationString);
});


test('Throws an error when INPUT fails cutom regex', () => {
    expect(() => {
        let goodLocationString = "/myurl3"
        let myCustomRegex = ["[^a-z/]", "g"]  // Only allow the letters a through z and the forward slash
        const sanitizedLocationHeader = lc.checkLocationHeader(goodLocationString, myCustomRegex)
        return sanitizedLocationHeader
    }).toThrow();
});