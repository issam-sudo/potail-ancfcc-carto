import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCartoComponent } from './marketplace-carto.component';

describe('MarketplaceCartoComponent', () => {
  let component: MarketplaceCartoComponent;
  let fixture: ComponentFixture<MarketplaceCartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceCartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
