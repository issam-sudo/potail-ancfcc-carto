import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEarthComponent } from './map-earth.component';

describe('MapEarthComponent', () => {
  let component: MapEarthComponent;
  let fixture: ComponentFixture<MapEarthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapEarthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
