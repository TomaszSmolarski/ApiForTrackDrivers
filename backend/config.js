// Konfiguracja aplikacji
const config = {
    env: process.env.NODE_ENV || 'development',
    port: 9000,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: process.env.DB_CONNECT,
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }

    },
    cookiesOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'None',
        maxAge: 1000 * 60 * 30,
        httpOnly: false,
        signed: true,
    },
};

module.exports = config;
