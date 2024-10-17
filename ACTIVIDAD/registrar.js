import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { Auth } from "./firebase.js";
import { mostrarMensaje } from "./mostrarmensajes.js";

const Registrar = document.getElementById("registrar-form");
Registrar.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = Registrar["registrar-email"].value;
    const password = Registrar["registrar-password"].value;
    try{
        const userCredential = await createUserWithEmailAndPassword (Auth,email,password);
        console.log(userCredential);
        const RegistrarModal = document.getElementById("RegistrarModal");
        const modal = bootstrap.Modal.getInstance(RegistrarModal);
        modal.hide();

        Registrar.reset();
        mostrarMensaje("BIENVENIDO"+ userCredential.user.email);
    }catch(error){
        if(error.code== 'auth/invalid-email'){
            mostrarMensaje("Email invalido","error")
        }else if(error.code=== 'auth/weak-password'){
            mostrarMensaje("password muy corto", "error")
        }else if(error.code=== "auth/email-already-in-use"){
            mostrarMensaje("email en uso", "error")
        }else if(error.code){
            mostrarMensaje("algo salio mal", "error")
        }
    }
});