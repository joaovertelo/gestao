/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GestaoTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoProdutoDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-produto/tipo-produto-detail.component';
import { TipoProdutoService } from '../../../../../../main/webapp/app/entities/tipo-produto/tipo-produto.service';
import { TipoProduto } from '../../../../../../main/webapp/app/entities/tipo-produto/tipo-produto.model';

describe('Component Tests', () => {

    describe('TipoProduto Management Detail Component', () => {
        let comp: TipoProdutoDetailComponent;
        let fixture: ComponentFixture<TipoProdutoDetailComponent>;
        let service: TipoProdutoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GestaoTestModule],
                declarations: [TipoProdutoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoProdutoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoProdutoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoProdutoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoProdutoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoProduto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoProduto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
