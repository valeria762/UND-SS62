import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { Auth } from "./firebase.js";
import { mostrarMensaje } from "./mostrarmensajes.js";

const registrar = document.getElementById("registrar");
registrarform.addEventListener("submit", async(e)=>{
    e.priventDefault();
    const email = registrarform["registrar-email"].value;
    constpassword = registrarform["registrar-password"];
    try{
        const userCredential = await createUserWithEmailAndPassword (Auth,email,password);
        console.log(userCredential);
        const RegistrarModal = document.getElementById("RegistrarModal");
        const modal = bootstrap.Modal.getInstance(RegistrarModal);
        modal.hide();

        registrarform.reset();
        mostrarMensaje("BIENVENIDO"+ userCredential.user.email);
    }catch{
        console.log("error");
    }
});