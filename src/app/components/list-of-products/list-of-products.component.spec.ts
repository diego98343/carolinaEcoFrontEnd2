import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProductsComponent } from './list-of-products.component';

describe('ListOfProductsComponent', () => {
  let component: ListOfProductsComponent;
  let fixture: ComponentFixture<ListOfProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
