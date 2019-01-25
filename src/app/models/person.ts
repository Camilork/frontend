export class Person {
    constructor(_id = null,nombre = "",apellido = "", correo = "",password = ''){
        this._id= _id;
        this.name = nombre;
        this.lastname = apellido;
        this.email = correo;
        this.password = password;
    }
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password : string;
}
