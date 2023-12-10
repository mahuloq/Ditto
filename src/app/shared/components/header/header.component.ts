import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { Ditti } from 'app/shared/ditti.model';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuthenticated=false;
private userSub:Subscription;


  dittis: Ditti[] = [];
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
this.userSub=this.authService.user.subscribe(user => {
  this.isAuthenticated=!!user;
  console.log(!user);
  console.log(!!user);
})

    this.getDittis();
  }

  getDittis(): void {
    this.dataStorageService.getDittis().subscribe((data: Ditti[]) => {
      this.dittis = data;
      console.log(data);
    });
    console.log('Dittis:');
  }
  signUp() {
    this.router.navigate(['/auth/signup']);
  }
  login() {
    this.router.navigate(['/auth/login']);
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
