import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  sourceOfError;

  constructor(private router: Router) {
    this.sourceOfError = this.router.getCurrentNavigation().extras.state.source;
  }
}
