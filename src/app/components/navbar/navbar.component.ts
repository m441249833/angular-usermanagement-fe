import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username;

  constructor(private token:TokenStorageService, private router:Router) { 
    if (token.getUsername() !== null){
      this.username = token.getUsername();
    };
  }

  ngOnInit(): void {
  }

  onLogout(){
    if (confirm('Are you sure you want to logout?')){
      this.token.signOut();
      this.router.navigateByUrl('/login');
    }
  }

  isAdmin():boolean{
    let role = this.token.getRole()
    if (role === '1') return true;
    return false;
  }
}
