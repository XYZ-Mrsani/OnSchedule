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
      Swal.fire(
          'Username Should Not Be Empty', '',
          'warning'
      )
  }
  else if (password == "") {
      Swal.fire(
          'Password Should Not Be Empty', '',
          'warning'
      )
  }else{
    window.location.href="http://localhost:4200/dashboard";
  }
  }
}
