import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('PedidoProduto e2e test', () => {

    let navBarPage: NavBarPage;
    let pedidoProdutoDialogPage: PedidoProdutoDialogPage;
    let pedidoProdutoComponentsPage: PedidoProdutoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PedidoProdutos', () => {
        navBarPage.goToEntity('pedido-produto');
        pedidoProdutoComponentsPage = new PedidoProdutoComponentsPage();
        expect(pedidoProdutoComponentsPage.getTitle()).toMatch(/gestaoApp.pedidoProduto.home.title/);

    });

    it('should load create PedidoProduto dialog', () => {
        pedidoProdutoComponentsPage.clickOnCreateButton();
        pedidoProdutoDialogPage = new PedidoProdutoDialogPage();
        expect(pedidoProdutoDialogPage.getModalTitle()).toMatch(/gestaoApp.pedidoProduto.home.createOrEditLabel/);
        pedidoProdutoDialogPage.close();
    });

    it('should create and save PedidoProdutos', () => {
        pedidoProdutoComponentsPage.clickOnCreateButton();
        pedidoProdutoDialogPage.setQuantidadeInput('5');
        expect(pedidoProdutoDialogPage.getQuantidadeInput()).toMatch('5');
        pedidoProdutoDialogPage.setPrecoInput('5');
        expect(pedidoProdutoDialogPage.getPrecoInput()).toMatch('5');
        pedidoProdutoDialogPage.pedidoSelectLastOption();
        pedidoProdutoDialogPage.produtoSelectLastOption();
        pedidoProdutoDialogPage.save();
        expect(pedidoProdutoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PedidoProdutoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pedido-produto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PedidoProdutoDialogPage {
    modalTitle = element(by.css('h4#myPedidoProdutoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    quantidadeInput = element(by.css('input#field_quantidade'));
    precoInput = element(by.css('input#field_preco'));
    pedidoSelect = element(by.css('select#field_pedido'));
    produtoSelect = element(by.css('select#field_produto'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setQuantidadeInput = function (quantidade) {
        this.quantidadeInput.sendKeys(quantidade);
    }

    getQuantidadeInput = function () {
        return this.quantidadeInput.getAttribute('value');
    }

    setPrecoInput = function (preco) {
        this.precoInput.sendKeys(preco);
    }

    getPrecoInput = function () {
        return this.precoInput.getAttribute('value');
    }

    pedidoSelectLastOption = function () {
        this.pedidoSelect.all(by.tagName('option')).last().click();
    }

    pedidoSelectOption = function (option) {
        this.pedidoSelect.sendKeys(option);
    }

    getPedidoSelect = function () {
        return this.pedidoSelect;
    }

    getPedidoSelectedOption = function () {
        return this.pedidoSelect.element(by.css('option:checked')).getText();
    }

    produtoSelectLastOption = function () {
        this.produtoSelect.all(by.tagName('option')).last().click();
    }

    produtoSelectOption = function (option) {
        this.produtoSelect.sendKeys(option);
    }

    getProdutoSelect = function () {
        return this.produtoSelect;
    }

    getProdutoSelectedOption = function () {
        return this.produtoSelect.element(by.css('option:checked')).getText();
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
