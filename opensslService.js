const shell = require('shelljs');

getCertInfoPerUrl = (url) => {
    var noSchemeUrl = url.replace(/(^\w+:|^)\/\//, '');
    var exp = shell.exec(`echo | openssl s_client -servername ${noSchemeUrl} -connect ${noSchemeUrl}:${sslPort} 2>/dev/null | openssl x509 -noout -dates 2>/dev/null`);

    var expRawString = expPattern.exec(exp.stdout);
    var expDateObj = new Date(expRawString[1]).toISOString().replace(/:/g, '-')

    return {
        domain: url,
        expires: expDateObj
    };
}

getCertInfo = (urls) => {
    var res = [];
    const sslPort = 443;
    const expPattern = /notAfter=(.*)/;

    for (const url of urls) {
        res.push(getCertInfoPerUrl(url));
    }

    return res;
}

module.exports = {
    getCertInfo: getCertInfo
};