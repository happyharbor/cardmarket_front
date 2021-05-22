const prod = {
    url: {
        API_URL: 'https://cardmarket.happyharbor.io:50501/'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8081/'
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;