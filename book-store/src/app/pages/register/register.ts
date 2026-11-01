import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = "";
  email: string = '';
  phone: string = "";
  password: string = '';
  confirmPassword: string = '';


  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password


    }
    this.auth.register(data).subscribe({
      next: (response) => {
        if (response.msg) {
          alert('Registered Successfully');
          this.router.navigate(['/login'])

        } else {
          alert(response.error);
        }
      },
      error: (error) => {
        console.log(error);
        alert('Something went wrong');
      }
    })
  }
}
