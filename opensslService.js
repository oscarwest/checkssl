const sslChecker = require('ssl-checker')
const execAsync = require('./execAsync');

const sslPort = 443;
const expiryPattern = /notAfter=(.*)/;
// const opts = { async: true };

getCertInfo = async (urls) => await Promise.all(urls.map(mapUrl));

mapUrl = async (domain) => {
    const noSchemeUrl = domain.replace(/(^\w+:|^)\/\//, '');

    let response;
    
    try { 
        response = await sslChecker(noSchemeUrl);
        response.domain = domain;
    }
    catch (error)
    {
        console.log(error);
        response = {
            valid: false,
            valid_to: "",
            days_remaining: -1,
            domain: domain
        }
    }

    return response;
}

module.exports = {
    getCertInfo: getCertInfo
};