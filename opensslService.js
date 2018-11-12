const shell = require('shelljs');

const sslPort = 443;
const expPattern = /notAfter=(.*)/;

getCertInfoPerUrl = (url) => {
    let noSchemeUrl = url.replace(/(^\w+:|^)\/\//, '');
    let exp = shell.exec(`echo | openssl s_client -servername ${noSchemeUrl} -connect ${noSchemeUrl}:${sslPort} 2>/dev/null | openssl x509 -noout -dates 2>/dev/null`);

    if (exp.code === 1) {
        return {
            domain: url,
            expires: null,
            error: true
        }
    }

    let expRawString = expPattern.exec(exp.stdout);
    let expDateObj = new Date(expRawString[1]).toISOString().replace(/:/g, '-')

    return {
        domain: url,
        expires: expDateObj,
        error: false
    };
}

getCertInfo = (urls) => {
    var res = [];

    for (const url of urls) {
        res.push(getCertInfoPerUrl(url));
    }

    return res;
}

module.exports = {
    getCertInfo: getCertInfo
};