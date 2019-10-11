import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel=new UsuarioModel();
  recordarme= false;

  constructor(
    private auth:AuthService,
    private router:Router
  ) {
  
   }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email= localStorage.getItem('email');
      this.recordarme = true;
    }
  }



  login(form:NgForm){
    if (!form.valid) {return;}
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'esperando '
    });
    Swal.showLoading();
    this.auth.LogIn(this.usuario).subscribe(data=>{
      console.log(data);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    },
    error =>{
      console.log(error.error.error.errors[0]['message']);
      Swal.fire({
         type:'error',
         title:'Error al autenticar',
        text:error.error.error.errors[0]['message']
      });
    }
    
    );
  


  }
}
