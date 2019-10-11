import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

usuario:UsuarioModel;
recordarme= false;

  constructor( 
    private auth:AuthService,
    private router:Router
  ) { 
    this.usuario = new UsuarioModel();

    
  }

  ngOnInit() { 
    if (localStorage.getItem('email')) {
      this.usuario.email= localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit(form:NgForm){

    if (!form.valid) {return;}
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'esperando '
    });
      
    this.auth.nuevoUsuario(this.usuario).subscribe(

      data =>{

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
