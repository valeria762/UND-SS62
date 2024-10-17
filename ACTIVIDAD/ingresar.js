import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { Auth } from "./firebase.js";
import { mostrarMensaje } from "./mostrarmensajes.js";

const ingresar= document.getElementById("ingresar-form");

ingresar.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = ingresar["ingresar-email"].value;
    const password = ingresar["ingresar-password"].value;
    try{
        const userCredential = await signInWithEmailAndPassword (Auth,email,password);
        console.log(userCredential);
        const ingresarModal = document.getElementById("IngrersarModal");
        const modal = bootstrap.Modal.getInstance(ingresarModal);
        modal.hide();

        ingresar.reset();
        mostrarMensaje("BIENVENIDO"+ userCredential.user.email);
    }catch(error){
        if(error.code== 'auth/wrong-password'){
            mostrarMensaje("Password equibocado","error")
        }else if(error.code=== 'auth/user-not-found'){
            mostrarMensaje("No existe el usuario", "error")
        }else if(error.code){
            mostrarMensaje("Algo salio mal", "error")
        }
    }
});