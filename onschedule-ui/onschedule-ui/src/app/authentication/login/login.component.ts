import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../../app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private adminService: AdminService,) { }

  ngOnInit(): void {

  }
  dataLog: any = {};

  loginUser(event: any) {
    event.preventDefault();
    const target = event.target
    const username = target.querySelector(".username").value
    const password = target.querySelector(".password").value

    if (username == "") {
      Swal.fire({
        title: "Username Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    }
    else if (password == "") {
      Swal.fire({
        title: "Password Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.adminService.login(username, password).subscribe((data) => {
        this.dataLog = data;

        if (this.dataLog.success) {
          localStorage.setItem('usertoken', username);
          //localStorage.setItem('token', this.dataLog.token);
          
          window.location.href = "http://localhost:4200/dashboard";
        } else {
          Swal.fire({
            title: this.dataLog.message,
            icon: "error",
            iconColor: "red",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
        });
        }
      }, err => {
        Swal.fire({
          title: "Login Failed",
          icon: "error",
          iconColor: "red",
          confirmButtonColor: "green",
          confirmButtonText: "Ok",
      });
      });
    }
  }
}
