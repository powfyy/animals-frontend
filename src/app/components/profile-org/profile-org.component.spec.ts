import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrgComponent } from './profile-org.component';

describe('ProfileOrgComponent', () => {
  let component: ProfileOrgComponent;
  let fixture: ComponentFixture<ProfileOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
