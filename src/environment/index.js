const dotenv = require('dotenv'),
      path   = require('path');

module.exports = () => {
    let dotfile;
    
    switch(process.env.NODE_ENV) {
        case 'production':
            dotfile = '.prod.env';
            break;
        default:
            dotfile = '.dev.env';
    }

    // Init dotenv file
    dotenv.config({ path: path.resolve(__dirname, dotfile) });
}