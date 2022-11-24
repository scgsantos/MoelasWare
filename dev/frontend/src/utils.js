function isLoggedIn(){
    return sessionStorage.getItem("access") !== null && sessionStorage.getItem("access") !== "undefined";
}
export default isLoggedIn;
