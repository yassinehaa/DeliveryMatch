import {Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {Role} from '../../../models/role.model';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    verified: false,
    active: false,
    role: Role.USER
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.user.email && this.user.password) {
      this.userService.createuser(this.user).subscribe(); // Replace with actual login endpoint if different
    }
  }
}
