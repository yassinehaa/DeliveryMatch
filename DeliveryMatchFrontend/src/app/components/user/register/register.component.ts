import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/role.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
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

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    const role = this.route.snapshot.url[0]?.path;
    if (role === 'driver') {
      this.user.role = Role.CONDUCTEUR;
    } else if (role === 'shipper') {
      this.user.role = Role.EXPEDITEUR;
    }
  }

  onSubmit() {
    if (this.user.email && this.user.password && this.user.firstName && this.user.lastName) {
      this.userService.createuser(this.user).subscribe();
    }
  }

  protected readonly Role = Role;
}
