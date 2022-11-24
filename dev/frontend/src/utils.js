let isLoggedIn = () => sessionStorage.getItem("access") != null;
export default isLoggedIn;