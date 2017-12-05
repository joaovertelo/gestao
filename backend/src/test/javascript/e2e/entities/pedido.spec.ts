import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Pedido e2e test', () => {

    let navBarPage: NavBarPage;
    let pedidoDialogPage: PedidoDialogPage;
    let pedidoComponentsPage: PedidoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pedidos', () => {
        navBarPage.goToEntity('pedido');
        pedidoComponentsPage = new PedidoComponentsPage();
        expect(pedidoComponentsPage.getTitle()).toMatch(/gestaoApp.pedido.home.title/);

    });

    it('should load create Pedido dialog', () => {
        pedidoComponentsPage.clickOnCreateButton();
        pedidoDialogPage = new PedidoDialogPage();
        expect(pedidoDialogPage.getModalTitle()).toMatch(/gestaoApp.pedido.home.createOrEditLabel/);
        pedidoDialogPage.close();
    });

    it('should create and save Pedidos', () => {
        pedidoComponentsPage.clickOnCreateButton();
        pedidoDialogPage.setDataInput(12310020012301);
        expect(pedidoDialogPage.getDataInput()).toMatch('2001-12-31T02:30');
        pedidoDialogPage.clienteSelectLastOption();
        pedidoDialogPage.save();
        expect(pedidoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PedidoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pedido div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PedidoDialogPage {
    modalTitle = element(by.css('h4#myPedidoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dataInput = element(by.css('input#field_data'));
    clienteSelect = element(by.css('select#field_cliente'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDataInput = function (data) {
        this.dataInput.sendKeys(data);
    }

    getDataInput = function () {
        return this.dataInput.getAttribute('value');
    }

    clienteSelectLastOption = function () {
        this.clienteSelect.all(by.tagName('option')).last().click();
    }

    clienteSelectOption = function (option) {
        this.clienteSelect.sendKeys(option);
    }

    getClienteSelect = function () {
        return this.clienteSelect;
    }

    getClienteSelectedOption = function () {
        return this.clienteSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
