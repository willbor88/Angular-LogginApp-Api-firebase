import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:string


  private url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty';//Api firebase 
  private apiKey ='AIzaSyCY0aUK9IRYAFW20v8lvLGPGNGk8DYtTl8'// Clave dada por tu usuario fireBase

  //Crear nuevo usuario
  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  //Loggin
  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
  constructor(private http:HttpClient) {
    //this.leerToken();
   }

  

   LogIn(usuario:UsuarioModel){
    const authData={
      // email:usuario.email,
      // password:usuario.password,
      // returnSecureToken:true
  
      // o  asi
      ...usuario,
      returnSecureToken:true
  
      };
  
      return this.http.post(
        `${this.url}/verifyPassword?key=${this.apiKey}`,authData
        
      ).pipe(
        map(resp=>{ 
        this.guardarToken(resp['idToken'])
        return resp
  
        })
      );


   }
   nuevoUsuario(usuario:UsuarioModel){
    const authData={
    // email:usuario.email,
    // password:usuario.password,
    // returnSecureToken:true

    // o  asi
    ...usuario,
    returnSecureToken:true

    };

    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apiKey}`,authData
      
    ).pipe(
      map(resp=>{ 
      this.guardarToken(resp['idToken'])
      return resp

      })
    );

   }
   private guardarToken (idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);    

    let hoy = new Date();
    hoy.setSeconds(3600);
console.log(hoy);

    localStorage.setItem('expirar',hoy.getTime().toString());
    
   }

   leerToken(){

    if (localStorage.getItem('token')) {
      this.userToken ='';
    }
    else{

      return this.userToken;
          }

   }

   estaAutenticado():boolean{

    // if (localStorage.getItem('token')) {
    //   this.userToken ='';
      
    //   return true
    // }
    

 

  if (this.userToken.length <2) {
    return false  }

    const expirar = Number(localStorage.getItem('expirar'));
    const expiraDate = new Date();
    expiraDate .setTime(expirar)

    if (expiraDate>new Date()) {
      return true
    }
    else{
      return false
    }

   }
   verToken(){
    let token:string;
    return token = localStorage.getItem('token')
   }
   
   logout(){
    localStorage.removeItem('token');
    localStorage.clear;
 
       }
     





}
