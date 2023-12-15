import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';

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
  previousDitti;
  isHome;
  currentLocation;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dittiService: DittiService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.router.events.subscribe((val) => {
      console.log(val);
      if (val instanceof RoutesRecognized) {
        if (val.url == '/') {
          console.log(val.url);
          this.isHome = true;
        } else {
          this.isHome = false;
          this.currentLocation = val.url.split('/')[2];
          console.log('Current Location');
          console.log(this.currentLocation);
        }
      }
    });

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

  navigate() {
    if (event.target instanceof Element) {
      let data = event.target.id;
      if (data == 'home') {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/ditti', this.previousDitti]);
      }
    }
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
    this.previousDitti = dittiName;
    this.router.navigate(['/ditti', dittiName]);
  }
}
