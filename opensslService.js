const sslChecker = require('ssl-checker')
const execAsync = require('./execAsync');

const sslPort = 443;
const expiryPattern = /notAfter=(.*)/;
// const opts = { async: true };

getCertInfo = async (urls) => await Promise.all(urls.map(mapUrl));

mapUrl = async (domain) => {
    var startTime = new Date();
    console.log("[" + startTime + "] Checking domain: " + domain);

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
    var endTime = new Date();
    console.log("[" + endTime + "] Done domain: " + domain);
    var deltaTime = endTime - startTime;
    console.log("Duration: " + deltaTime);

    return response;
}

module.exports = {
    getCertInfo: getCertInfo
};