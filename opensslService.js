const execAsync = require('./execAsync');

const sslPort = 443;
const expiryPattern = /notAfter=(.*)/;
// const opts = { async: true };

getCertInfo = async (urls) => await Promise.all(urls.map(mapUrl));

mapUrl = async (domain) => {
    const noSchemeUrl = domain.replace(/(^\w+:|^)\/\//, '');
    const query = `echo | openssl s_client -servername ${noSchemeUrl} -connect ${noSchemeUrl}:${sslPort} 2>/dev/null | openssl x509 -noout -dates 2>/dev/null`;

    let rawCertExpiry;

    try { 
        rawCertExpiry = await execAsync(query);
    }
    catch (error)
    {
        console.log(error);
        rawCertExpiry = null;
    }

    const rawExpiry = rawCertExpiry ? expiryPattern.exec(rawCertExpiry) : undefined;
    const expiryDate = rawExpiry && rawExpiry.length > 1 ? new Date(rawExpiry[1]).toISOString() : null;

    const sslCert = { domain, expiryDate };

    if(!expiryDate) { 
        return { ...sslCert, error: "Could not parse expiry date." }; 
    }

    return Promise.resolve(sslCert);
}

module.exports = {
    getCertInfo: getCertInfo
};