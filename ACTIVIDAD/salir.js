import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { Auth } from "./firebase.js";

const logout = document.getElementById("logout");

logout.addEventListener("click", async(e) =>{
    e.preventDefault();
    try{
        await signOut(Auth);
    }catch(error){
        console.log(error)
    }
});