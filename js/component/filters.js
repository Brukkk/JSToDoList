export default class Filters{
    constructor(){
        this.form = document.getElementById("filters");
        this.btn = document.getElementById("search");

    }

    onClick(callback){
        this.btn.onclick = (e) =>{
            e.preventDefault(); // Evita que nos recarge la pagina cuando tenemos formularios y hacer una request al servidor
            const data = new FormData(this.form);
            callback({
                type: data.get("type"),
                words: data.get("words"),
            })

        }
    }
}