import { Auth, deletePost, onGetPosts, updatePost } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import './registrar.js';
import './ingresar.js';
import './loginCheck.js';
import './salir.js';
import './postList.js';
import {loginCheck} from './loginCheck.js';
import { setupPosts } from "./postList.js";
import { savePost,getPost, getPost1 } from "./firebase.js";

onAuthStateChanged(Auth ,async(user)=>{
    const taskForm = document.getElementById("task-form")
    let editStatus = false;
    let id ='';
    if(taskForm.listener){
        taskForm.removeEventListener("submit", taskForm.listener);
    }
    if(user){
        loginCheck(user);
        const correo = user.email;
        taskForm.listener = (e) => {
            e.preventDefault();
            const title = taskForm["task-title"].value;
            const description = taskForm["task-description"].value;
            if(!editStatus){
                savePost(title, description, correo);
            }else{
                updatePost(id, {title,description});
                editStatus = false;
                document.getElementById('titulo').innerHTML = "Agregar post";
                taskForm['btn-task-form'].innerHTML = "Guardar";
            }
            taskForm.reset();
        }
        taskForm.addEventListener("submit", taskForm.listener);
        try{
            const querySnapshot = await getPost();
            const taskcontainer = document.getElementById("task-container");
    
            onGetPosts((querySnapshot) => {
                let html = '';
                querySnapshot.forEach(doc => {
                    const post = doc.data();
                    if(post.userMail == correo){
                        html += `
                            <li class="list-group-item list-group-item-action mt-2">
                              <h5>${post.title}</h5>
                              <p>${post.description}</p>
                            <div>
                               <button class="btn btn-primary btn-delete" data-id="${doc.id}">Borrar</button>
                               <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Editar</button>
                            </div>
                        `;
                    }
                });
                taskcontainer.innerHTML = html
                const btnsDelete = taskcontainer.querySelectorAll('.btn-delete');
                btnsDelete.forEach(btn => {
                    btn.addEventListener('click', (event) =>{
                        deletePost(event.target.dataset.id);
                    })
                })
                const btnsEdit = taskcontainer.querySelectorAll('.btn-edit');
                btnsEdit.forEach(btn => {
                    btn.addEventListener('click', async(event) => {
                        const doc = await getPost1(event.target.dataset.id);
                        const post = doc.data();
                        taskForm['task-title'].value = post.title;
                        taskForm['task-description'].value = post.description;
                        editStatus = true;
                        id = event.target.dataset.id;
                        taskForm['btn-task-form'].innerText = 'Actualizar';
                        document.getElementById('titulo').innerHTML = 'Actualizar Post';
                    })
                })
            })
        }catch(error){
            console.log(error)
        }
    }else{
        //const mensaje = "";
        //setupPosts(mensaje);
        loginCheck(user)
        const taskcontainer = document.getElementById("task-container");
        taskcontainer.innerHTML = '<h3>Inicia sesion para ver las publicaciones</h3>'
    }
});