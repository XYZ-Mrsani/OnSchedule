import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    
  }
  loginUser(event:any) {
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
  }else{
    window.location.href="http://localhost:4200/dashboard";
  }
  }
}
