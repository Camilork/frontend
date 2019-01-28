import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Config } from '../config/config';

@Injectable()
export class PersonService {
  selectperson : Person;
  person : Person[];
  server: Config;
  constructor(public http: HttpClient) { 
    this.selectperson = new Person();
    this.server = new Config;
  }
  
  getPerson(){
    return this.http.get(this.server.server); 
  }
  postPerson(person: Person){
    return this.http.post(this.server.server,person);
  }
  putPerson(person: Person){
    return this.http.put(this.server.server + `/${person._id}`,person); 
  }
  deletePerson(_id: string){
    return this.http.delete(this.server.server + `/${_id}`); 
  }
}
