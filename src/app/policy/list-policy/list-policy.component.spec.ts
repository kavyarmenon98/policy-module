import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPolicyComponent } from './list-policy.component';

describe('ListPolicyComponent', () => {
  let component: ListPolicyComponent;
  let fixture: ComponentFixture<ListPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPolicyComponent]
    });
    fixture = TestBed.createComponent(ListPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
