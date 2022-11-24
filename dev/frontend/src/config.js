const API_DEV_URL = new URL("http://localhost:8000");
const API_PROD_URL = new URL("https://api.moelasware.xyz");

const isdev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
    svurl: isdev() ? API_DEV_URL : API_PROD_URL
}
