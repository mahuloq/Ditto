import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DittiComponent } from './ditti.component';

describe('DittiComponent', () => {
  let component: DittiComponent;
  let fixture: ComponentFixture<DittiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DittiComponent]
    });
    fixture = TestBed.createComponent(DittiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
