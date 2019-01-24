export class Person {
    constructor(_id = null,nombre = "",apellido = "", correo = ""){
        this._id= _id;
        this.name = nombre;
        this.lastname = apellido;
        this.email = correo;
    }
    _id: string;
    name: string;
    lastname: string;
    email: string;
}
