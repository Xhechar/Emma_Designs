import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/fashion.interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerUserForm!: FormGroup;
  profileImage!: string;

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.registerUserForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      county: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]]
    });
  }

  registerUser() {
    const formValue = { ...this.registerUserForm.value };
    delete formValue.c_password;

    this.userService.createUser(formValue as User).subscribe(res => {
      //message or error
    })
  }

  getImageUrl(event: any) {
    const file = event.target.files[0];

    let formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'emma_designs');
    formData.append('cloud_name', 'darkiyiye2e');

    fetch('https://api.claudinary.com/v1_1/darkiyiye2e/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      this.profileImage = res.url;

      this.registerUserForm.patchValue({ profile_image: this.profileImage });
    })
  }

}
