/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GestaoTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PedidoProdutoDetailComponent } from '../../../../../../main/webapp/app/entities/pedido-produto/pedido-produto-detail.component';
import { PedidoProdutoService } from '../../../../../../main/webapp/app/entities/pedido-produto/pedido-produto.service';
import { PedidoProduto } from '../../../../../../main/webapp/app/entities/pedido-produto/pedido-produto.model';

describe('Component Tests', () => {

    describe('PedidoProduto Management Detail Component', () => {
        let comp: PedidoProdutoDetailComponent;
        let fixture: ComponentFixture<PedidoProdutoDetailComponent>;
        let service: PedidoProdutoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GestaoTestModule],
                declarations: [PedidoProdutoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PedidoProdutoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PedidoProdutoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PedidoProdutoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidoProdutoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PedidoProduto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pedidoProduto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
