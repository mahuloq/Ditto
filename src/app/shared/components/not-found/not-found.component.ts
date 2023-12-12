import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  sourceOfError = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sourceOfError = this.router.getCurrentNavigation().extras.state.source;
  }
}
