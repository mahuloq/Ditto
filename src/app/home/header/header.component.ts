import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isAuthenticated: boolean;
constructor(private authService:AuthService) {}

ngOnInit(): void {
this.authService.user.subscribe((user)=> {
  console.log(user);
})

}
}
