
module.exports.sanitizeLocationHeader = function(rawLocationHeader, whitelist) {

    let whitelistRegex;
    if (whitelist) {
        whitelistRegex = new RegExp(whitelist[0], whitelist[1] || undefined)
    } else {
        whitelistRegex = new RegExp("[^a-zA-Z0-9/+-_:?=]", "g");
    }

    const uriEncodedHeader = encodeURI(rawLocationHeader)
    const buf = Buffer.from(uriEncodedHeader, 'ascii');
    const asciiLocation = buf.toString('ascii')
    const asciiLocationArr = asciiLocation.split('');
    const blackListCharCodes = [10, 13, 32, 92];
    const sanitizedArr = asciiLocationArr.map( char => blackListCharCodes.includes(char.charCodeAt()) ? '' : char );
    const sanitizedLocationHeader = sanitizedArr.join('');

    if (!whitelistRegex.test(sanitizedLocationHeader)) { 
        return sanitizedLocationHeader
    } else {
        return new Error('Invalid Input')
    }
};

