const prod = {
    url: {
        API_URL: 'https://cardmarket.happyharbor.io/api/'
    },
    ttl: 18000
};

const dev = {
    url: {
        API_URL: 'http://localhost:8081/'
    },
    ttl: 1800000
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;