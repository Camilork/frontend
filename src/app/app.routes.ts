import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './componets/login/login.component'
import { PersonComponent } from './componets/person/person.component'

const app_routes : Routes = [
    { path : '' , component : LoginComponent },
    { path : 'user' , component : PersonComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);