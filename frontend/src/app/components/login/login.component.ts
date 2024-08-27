import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Logins } from '../../interfaces/fashion.interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  successMsg: string = '';
  errorMsg: string = '';
  display = {
    'display': 'flex',
    'color': 'rgb(15, 177, 15)'
  };

  constructor(private router: Router, private userService: UserService) { }

  changeDisplay() {
    if (this.successMsg) {
      this.display = {
        'display': 'flex',
        'color': 'rgb(15, 177, 15)'
      }

      setTimeout(() => {
        this.successMsg = '';
        this.display = {
          'display': 'none',
          'color': ''
        };
      }, 3000);
    } else if (this.errorMsg) {
      this.display = {
        'display': 'flex',
        'color': 'rgb(213, 5, 5)'
      }

      setTimeout(() => {
        this.successMsg = '';
        this.display = {
          'display': 'none',
          'color': ''
        };
      }, 3000);
    }
  }
  
  login(logins: Logins) {
    this.userService.loginUser(logins).subscribe(res => {
      if (res.message) {
        this.display = {
        'display': 'flex',
        'color': 'rgb(15, 177, 15)'
        }
        this.successMsg = res.message;

        setTimeout(() => {
          this.successMsg = '';
          this.display = {
            'display': 'none',
            'color': ''
          };

          localStorage.setItem('token', res.token as string);

          if (res.role == 'admin') {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/user'])
          }
        }, 3000);
      } else if (res.error) {
        this.errorMsg = res.error;
        this.display = {
          'display': 'flex',
          'color': 'rgb(213, 5, 5)'
        }
  
        setTimeout(() => {
          this.successMsg = '';
          this.display = {
            'display': 'none',
            'color': ''
          };
        }, 3000);
      }
    })
  } 
}
