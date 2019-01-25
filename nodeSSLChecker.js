'use strict';

const https = require('https');

/**
 * Checks SSL Expiry date
 * @param {string} host
 * @param {string} method
 * @param {number} port
 * @return {object}
 */
module.exports = (host, method, port) => {
	if (!host || host === null) throw new Error("Invalid host");
	
	const numericPort = parseInt(port);
	
	const options = {
		host: host,
		method: method || 'HEAD',
		port: isNaN(numericPort) ? 443 : numericPort,
		rejectUnauthorized: false,
		agent: false,
	};
	
	if (!options.port || options.port === null || options.port < 0 || options.port > 65535) throw new Error("Invalid port");
	
	const timeout = 5000;
	const daysBetween = (from, to) => Math.round(Math.abs((+from) - (+to))/8.64e7);
	
	return new Promise((resolve, reject) => {
		try {

			const req = https.request(options, res => {
				const { valid_from, valid_to } = res.connection.getPeerCertificate();
				let now = new Date();
				let days_remaining = daysBetween(now, new Date(valid_to));
				
				// Check if a certificate has already expired
				if (new Date(valid_to).getTime() < now.getTime()){
					days_remaining = -days_remaining;
				}

				resolve({
					valid: res.socket.authorized,
					valid_from,
					valid_to,
					days_remaining,
				});
			});
			
			req.on('socket', function (socket) {
					socket.setTimeout(timeout);
					socket.on('timeout', function() {
						req.abort();
					});
			});
			req.on('error', e => {
				if (e.code === "ECONNRESET")
				{
					resolve({
					valid: false,
					valid_from: null,
					valid_to: null,
					days_remaining: -1,
					error: "Connection timeout"
					});
				}
				else
					reject(e);
			});
			req.end();
		} 
		catch (e) {
			reject(e);
		}
	});
};
