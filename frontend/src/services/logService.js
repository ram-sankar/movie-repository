import Raven from 'raven-js'

// https://sentry.io/ 
// When error occurs call logService.log(error) this will store the error to sentry.io site

function init(){
    Raven.config("https://0e2bd0e84942410d99129c7b72d15b4e@o414991.ingest.sentry.io/5305411",{
        release:"1-0-0",
        environment:"development-test"
    }).install();
}

function log(error){
    Raven.captureException(error);
}

export default {
    init,
    log
}

