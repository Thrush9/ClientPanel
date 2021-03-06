import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn : boolean;
  loggedInUser : string;
  showRegister : boolean;

  constructor(private flashMessage: FlashMessagesService, 
    private authService : AuthService,
    private settingsService : SettingsService,
    private router : Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        
      } else{
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('Log out successfull!', {
      cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }

}
