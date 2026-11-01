import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-login',
  imports: [RouterLink,
    RouterLinkActive,

    FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = "";
  password: string = "";


  constructor(
    private auth: Auth,
    private router: Router
  ) { }


  login() {
    const data = {
      email: this.email,
      password: this.password
    }
    this.auth.login(data).subscribe({
      next: (response) => {
        if (response.token) {
          alert('Login Successfully');
          window.location.reload()
        }
      },
      error: (error) => {
        console.log(error)
        alert('Something went wrong');
      }
    })
  }
}
