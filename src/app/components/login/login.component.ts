import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imgUrl : string = 'url(../../../assets/images/login.jpg)';

  form: any={}
  isLoginFailed = false;
  errorMessage='';
  signupAlert=false;

  constructor(private auth:AuthService, 
              private tokenStorage:TokenStorageService,
              private router: Router,
              private modalService:NgbModal) {}

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.attemptAuth(this.form.username,this.form.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.TOKEN);
        this.tokenStorage.saveUsername(this.form.username);
        this.tokenStorage.saveRole(data.ROLE);
        this.isLoginFailed = false;
        this.signupAlert=true;
        this.router.navigateByUrl('/home')
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        if (this.errorMessage == undefined) this.errorMessage = "Server error."
        this.isLoginFailed = true;
      }
    );
  }

  onSignup(){
    const ref = this.modalService.open(RegisterComponent);
    ref.result.then((yes)=>{
      this.signupAlert=true;
    },
    (cancel)=>{
      return;
    }
    )
  }
  

}
