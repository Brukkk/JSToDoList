export default class Model{
    constructor(){
        this.view = null;
        // Almacena nuestra array de objetos todo..
        this.todos = JSON.parse(localStorage.getItem("todos"));
        if (!this.todos || this.todos.length < 1){
            this.todos = [
                {
                    id:0,
                    title: "Bruk",
                    description: "Build proyects",
                    completed:false
                }
            ]
            this.currentId =1;
        } else {
            this.currentId = this.todos[this.todos.length-1].id +1;
        }

    }
    setView(view){
        this.view = view;
    }
    save(){
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    getTodos (){
        // return this.todos

        // Ahora devolvemos una copia del contenido para no tener problemas de referencia
        return this.todos.map((todo) => ({...todo}));
    }

    findTodo(id){
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();

        console.log(this.todos); 
    }

    editTodo(id, values){
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }
    addTodo (title,description){
        // creamos nuestro objeto a guardar en todos[]
        const todo ={
            id: this.currentId++,
            title,
            description,
            completed: false
        }
        // pusheamos el objeto
        this.todos.push(todo);
        // imprimimos en la consola
        console.log(this.todos);

        // return todo; nos devuelve la referencia al puntero del objeto en MODEL.js
        // por ende en VIEW.js podriamos modificarlo ( no queremos eso )
        // devolvemos un clon del objeto 
         
        // return Object.assign({}, todo);
        this.save();
        
        // o lo devolvemos copiando el contenido
        return {...todo};
    }

    removeTodo(id){
        // nos devuelve el index en la array de toDos. Función que llama a función.
        const index = this.findTodo(id);
        this.todos.splice(index,1);
        this.save();
        console.log(this.todos);

        
    }
}