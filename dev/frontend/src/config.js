const API_DEV_URL = new URL("http://localhost:8000/api/");
const API_PROD_URL = new URL("https://api.moelasware.xyz/api/");

const isdev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
    apiUrl: isdev() ? API_DEV_URL : API_PROD_URL
}
