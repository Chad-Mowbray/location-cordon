
module.exports.checkLocationHeader = function(rawLocationHeader, whitelist) {
    
        let whitelistRegex;
        if (whitelist) {
            whitelistRegex = new RegExp(whitelist[0], whitelist[1] || undefined)
        } else {
            whitelistRegex = new RegExp("[^a-zA-Z0-9/+-_:?=]", "g");
        }

        const buf = Buffer.from(rawLocationHeader, 'ascii');
        const asciiLocation = buf.toString('ascii')
        const asciiLocationArr = asciiLocation.split('');
        const blackListCharCodes = [10, 13, 32, 92]; // LF CR space \
        const sanitizedArr = asciiLocationArr.map( char => blackListCharCodes.includes(char.charCodeAt()) ? '' : char );
        const sanitizedLocationHeader = sanitizedArr.join('');
        const uriEncodedHeader = encodeURI(sanitizedLocationHeader)

        if (!whitelistRegex.test(uriEncodedHeader)) { 
            return uriEncodedHeader
        } else {
            throw new Error('Invalid Input')
        }

};
