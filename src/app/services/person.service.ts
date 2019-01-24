import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';

@Injectable()
export class PersonService {
  selectperson : Person;
  person : Person[];

  readonly server: string = "http://localhost:3000";
  constructor(public http: HttpClient) { 
    this.selectperson = new Person();
  }

  getPerson(){
    return this.http.get(this.server); 
  }
  postPerson(persona: Person){
    return this.http.post(this.server,persona); 
  }
  putPerson(persona: Person){
    return this.http.put(this.server + `/${persona._id}`,persona); 
  }
  deletePerson(_id: string){
    return this.http.delete(this.server + `/${_id}`); 
  }
}
