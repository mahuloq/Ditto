import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { DittiService } from 'app/shared/ditti-service.service';
import { Ditti } from 'app/shared/ditti.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  private routeSub = new Subscription();
  dittis: Ditti[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private dittiService: DittiService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });

    this.dittiService.dittiListChanged.subscribe(
      (data) => (this.dittis = data)
    );
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const dittiName = params.get('name');
    });
  }
  onLogout() {
    this.authService.logout();
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
  navigateToDitti(dittiName: string) {
    this.router.navigate(['/ditti', dittiName]);
  }
}
