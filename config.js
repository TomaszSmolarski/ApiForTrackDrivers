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
    jwtExpiration: "30d"
};

module.exports = config;
