import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BitacoraComponent } from './bitacora.component';
import { Bitacora } from '../../model/bitacora';
import {getConexionBackend} from "../../utils/constants";

describe('BitacoraComponent', () => {
  let component: BitacoraComponent;
  let fixture: ComponentFixture<BitacoraComponent>;
  let bitacora: Bitacora;
  let httpMock: HttpTestingController;
  let BASE_URL: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, BitacoraComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BitacoraComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    bitacora = {
      idproblema: 0,
      descripcion: 'Testeo descripcion',
      solucion: 'Testeo solucion'
    };
    BASE_URL = getConexionBackend() + '/problemas';
    const req = httpMock.expectOne(BASE_URL + '/listar');
    req.flush([]);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al hacer clic en editar, se debe abrir el formulario', () => {
    component.bitacoraArray = [
      { idproblema: 1, descripcion: 'Testeo descripcion1', solucion: 'Testeo solucion1' },
      { idproblema: 2, descripcion: 'Testeo descripcion2', solucion: 'Testeo solucion2' },
      { idproblema: 3, descripcion: 'Testeo descripcion3', solucion: 'Testeo solucion3' },
    ];

    fixture.detectChanges();

    // Simula un clic en el botón de editar
    const editButton = fixture.debugElement.query(By.css('.btn-primary'));
    editButton.triggerEventHandler('click', null);

    // Verifica que showForm se ha establecido en true
    expect(component.showForm).toBeTrue();
  });

  it('Debe retornar formulario bitacoraForm valido', () => {
    component.bitacoraForm.setValue({
      descripcion: bitacora.descripcion,
      solucion: bitacora.solucion
    });

    const btnElement = fixture.debugElement.query(By.css('.btn'));

    if (btnElement) {
      expect(btnElement.nativeElement.disabled).toBeFalse();
    }

    expect(component.bitacoraForm.invalid).toBeFalse();
  });
  it('La escritura en la búsqueda debe actualizar automáticamente la lista', () => {
    spyOn(component, 'filterBitacora');

    const searchInput = fixture.debugElement.query(By.css('#search')).nativeElement;
    searchInput.value = 'Testeo';
    searchInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.filterBitacora).toHaveBeenCalled();
  });

});
