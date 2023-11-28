import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDittiComponent } from './make-ditti.component';

describe('MakeDittiComponent', () => {
  let component: MakeDittiComponent;
  let fixture: ComponentFixture<MakeDittiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeDittiComponent]
    });
    fixture = TestBed.createComponent(MakeDittiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
