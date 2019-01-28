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
    if(!this.datatest(form.value.name,form.value.lastname,form.value.email)){return 0}
    if(form.value._id) {
      console.log(form.value);
      this.personService.putPerson(form.value)
        .subscribe(res => {
          this.notificar("Actualizacion","Se actualizo con exito "+form.value.name+" "+form.value.lastname);
          this.getperson();
          this.resetForm(form);
        });
    } else {
      this.personService.postPerson(form.value)
      .subscribe(res => {
        this.notificar("Creacion","Se creo con exito  "+form.value.name+" "+form.value.lastname);
        this.getperson();
        this.resetForm(form);
      });
    }
  }
  editperson(person: Person) {
    this.personService.selectperson = person;
    this.personService.selectperson.password = null;
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

  datatest(name: string,lastname: string,email: string):boolean{
    if ((email == "") || (email == null) || (name == "") || (name == null) || (lastname == "") || (lastname == null)) { 
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
