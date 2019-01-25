'use strict';

const sslChecker = require('./nodeSSLChecker');

let getCertInfo = async (urls) => await Promise.all(urls.map(mapUrl));

let mapUrl = async (domain) => {
    var startTime = new Date();
    console.log("[" + startTime.toISOString() + "] Checking domain: " + domain);

    const noSchemeUrl = domain.replace(/^(\w+:)\/\//, '');

    console.debug(noSchemeUrl);

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
            domain: domain,
            error: error
        }
    }

    var endTime = new Date();
    console.log("[" + endTime.toISOString() + "] Done domain: " + domain);
    var deltaTime = endTime - startTime;
    console.log("Duration: " + deltaTime);

    return response;
}

module.exports = {
    getCertInfo: getCertInfo
};
