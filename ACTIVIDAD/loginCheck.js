const loggedOutLinks = document.querySelectorAll(",logget-out");
const loggedInLinks = document.querySelectorAll(",logget-in");

export const loginCheck = (user) => {
    if(user){
        loggedInLinks.forEach((link) => (link.style.display = "block")); //Visible(SALIR)
        loggedOutLinks.forEach((link) => (link.style.display = "none")); //No se deve ver(INGRESAR/REGISTRAR)
    }else{ //no se inicio secion
        loggedInLinks.forEach((link) => (link.style.display = "none")); //No se deve ver(SALIR)
        loggedOutLinks.forEach((link) => (link.style.display = "block")); //Viseble(INGRESAR/REGISTRAR)
    }
}