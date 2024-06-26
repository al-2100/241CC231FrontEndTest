import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarOstComponent } from './registrar-ost.component';

describe('RegistrarOstComponent', () => {
  let component: RegistrarOstComponent;
  let fixture: ComponentFixture<RegistrarOstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RegistrarOstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarOstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
