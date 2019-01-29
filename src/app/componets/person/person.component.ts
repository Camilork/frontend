import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
  providers: [PersonService],
})
export class PersonComponent implements OnInit {
  constructor(public personService : PersonService) { }
  notificacion = [];
  pswstatus : boolean = true;

  ngOnInit() {
   this.getperson(); 
  }
  
  addperson(form?: NgForm) {   
    if(!this.datatest(
      form.value.username,
      form.value.first_name,
      form.value.first_lastname,
      form.value.email,
      form.value.country,
      form.value.celphone,
      form.value.Rate_by_hour,
      form.value.Rate_by_mount
    )){return 0}
    if(form.value._id) {
      console.log(form.value);
      this.personService.putPerson(form.value)
        .subscribe(res => {
          this.notificar("Actualizacion","Se actualizo con exito "+form.value.username+" "+form.value.email);
          this.getperson();
          this.resetForm(form);
        });
    } else {
      delete form.value['_id']
      console.log(form.value)
      this.personService.postPerson(form.value)
      .subscribe(res => {
        this.notificar("Creacion","Se creo con exito  "+form.value.username+" "+form.value.email);
        this.getperson();
        this.resetForm(form);
      });
    }
  }
  editperson(person: Person) {
    this.personService.selectperson = person;
    this.personService.selectperson.password = null;
    document.documentElement.scrollTop = 0
    this.pswstatus = false;
  }
  getperson(){
    this.personService.getPerson()
    .subscribe(res => {
      this.personService.person = res as Person[];
    })
  }
  deleteperson(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.personService.deletePerson(_id)
        .subscribe(res => {
          this.notificar("Eliminacion","Se elimino con exito ");    
          this.getperson();
          this.resetForm(form);
        });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.pswstatus = true;
      this.personService.selectperson = new Person();
      this.getperson();
    }
  }

  datatest(
    username : string,
    first_name : string,
    first_lastname : string,
    email : string,
    country : string,
    celphone : string,
    Rate_by_hour : string,
    Rate_by_mount : string,
  ):boolean{
    if (
      (username == "") || (username == null) || 
      (first_name == "") || (first_name == null) || 
      (first_lastname == "") || (first_lastname == null) || 
      (email == "") || (email == null) || 
      (country == "") || (country == null) || 
      (celphone == "") || (celphone == null) || 
      (Rate_by_hour == "") || (Rate_by_hour == null) || 
      (Rate_by_mount == "") || (Rate_by_mount == null)
    ){ 
      alert("Los campos no pueden quedar vacios");
      return false;
    }
    return true;
  }
  notificar(titulo:string,mensaje:string){
    let date=new Date;
    let hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
    this.notificacion.unshift({titulo : titulo,mensaje : mensaje,hora:hora});
  }
}
