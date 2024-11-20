const wa = require('@open-wa/wa-automate');

const launchConfig = {

    useChrome: true,
    autoRefresh: true,
    cacheEnabled: false,
    sessionId: 'nps'

}

module.exports = {

    wa,
    launchConfig,

};