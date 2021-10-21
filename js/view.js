import AddTodo from './component/add-todo.js';
import Modal from './component/modal.js';
import Filters from './component/filters.js';

export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById("table");
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();


        /*  no podemos usar function() porque es una función pero un objeto al mismo tiempo
         y this. hace referencia al objeto de esta function()
         btn.onclick = function(){} == WRONG */

        /*  tenemos que hacer arrow function para que  (this.) haga referencia al al metodo de la clase
         y ahora la arrow function puede hacer referencia al metodo de la clase */
       
         /*  btn.onclick = ()=>{
            /*  Cuando hacemos click en ADD, llmamos al meotodo addTodo de VIEW.js
             el cuál crea una constante todo y la inicializa con el metodo addTodo de Model,
             la cual nos devuelve UNA COPIA del objeto creado con el metodo.  
            
             this.addTodo("Titulo","Desc");
        } */

        this.addTodoForm.onClick((title,description) => this.addTodo(title,description));
        this.modal.onClick((id,values) => this.editTodo(id,values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    setModel(model){
        this.model = model;
    }
    render(){
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createArrow(todo));
    }

    filter(filters){
        // {type: "all", words: "random"}

        const {type , words} = filters;
        // [, ...rows] en vez de hacer un for iniciado en la posicion 1 y no 0
        // creamos una constante donde incluya los <tr> pero el primero evitarlo (son los headings)
        const [, ...rows] = this.table.getElementsByTagName("tr");
        // Ahora buscamos las filas donde empiezan las tasks
        for (const row of rows){
            
            const [title, description , completed] = row.children;
            let shouldHide = false;

            if (words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === "completed";
            const isCompleted = completed.children[0].checked;

            if (type !== "all" && shouldBeCompleted !== isCompleted){
                shouldHide = true;
            }
            
            if(shouldHide){
                row.classList.add("d-none");
            } else {
                row.classList.remove("d-none");
            }
        
        }
    }   

    toggleCompleted(id){
        this.model.toggleCompleted(id);

    }

    editTodo(id,values){
        this.model.editTodo(id,values);

        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    removeTodo(id){
        /* Lo elimino primero de mi array de TODOS  */
        this.model.removeTodo(id);
        /*  LUEGO LO SACO DEL HTML */
        document.getElementById(id).remove();
    }

    addTodo(title,description){
        // Iniciamos un todo para almacenar lo que nos devuelve el model.js
        // con su objeto y metodo
        const todo = this.model.addTodo(title,description);
        
        //todo.title = "YOUTUBE"; */
        /* esto no va a servir porque no estamos devolviendo el puntero de todo */
        
        /* Añadimos con la nueva función el elemento que queriamos agregar */
        this.createArrow(todo);
    }

    createArrow(todo){
        const row = table.insertRow();
        row.setAttribute("id", todo.id);
        
        // Definimos los valores (del html) a agregar en esa fila (titulo y descriptcion) + checkbox + 2 botones
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
                
            </td>
            <td class="text-right">
            
            </td>
        `;
        // CREAMOS NUESTRA VARIABLES ??? en vez de manualmente

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);


        const editBtn = document.createElement("button");
        editBtn.classList.add("btn","btn-primary","mb-1");
        editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
        editBtn.setAttribute("data-toggle", "modal");
        editBtn.setAttribute("data-target", "#modal");
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked
        });
        row.children[3].appendChild(editBtn);

        //creamos elemento button html
        const removeBtn = document.createElement("button");
        // le agregamos las clases que nos brinda bootstrap
        removeBtn.classList.add("btn","btn-danger","mb-1","ml-1");
        //agregamos el iconito <i> dentro del button 
        removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        removeBtn.onclick = () => this.removeTodo(todo.id);   
        // a partir del 4hijo de mi fila (0= title, 1=desc,2=checkbox 3=buttons) le agrego el button remove como nuevo hijo( al lado del modify button).
        row.children[3].appendChild(removeBtn);

    }

}