import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Produto e2e test', () => {

    let navBarPage: NavBarPage;
    let produtoDialogPage: ProdutoDialogPage;
    let produtoComponentsPage: ProdutoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Produtos', () => {
        navBarPage.goToEntity('produto');
        produtoComponentsPage = new ProdutoComponentsPage();
        expect(produtoComponentsPage.getTitle()).toMatch(/gestaoApp.produto.home.title/);

    });

    it('should load create Produto dialog', () => {
        produtoComponentsPage.clickOnCreateButton();
        produtoDialogPage = new ProdutoDialogPage();
        expect(produtoDialogPage.getModalTitle()).toMatch(/gestaoApp.produto.home.createOrEditLabel/);
        produtoDialogPage.close();
    });

    it('should create and save Produtos', () => {
        produtoComponentsPage.clickOnCreateButton();
        produtoDialogPage.setNomeInput('nome');
        expect(produtoDialogPage.getNomeInput()).toMatch('nome');
        produtoDialogPage.setPrecoInput('5');
        expect(produtoDialogPage.getPrecoInput()).toMatch('5');
        produtoDialogPage.categoriaSelectLastOption();
        produtoDialogPage.save();
        expect(produtoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProdutoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-produto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProdutoDialogPage {
    modalTitle = element(by.css('h4#myProdutoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    precoInput = element(by.css('input#field_preco'));
    categoriaSelect = element(by.css('select#field_categoria'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function (nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function () {
        return this.nomeInput.getAttribute('value');
    }

    setPrecoInput = function (preco) {
        this.precoInput.sendKeys(preco);
    }

    getPrecoInput = function () {
        return this.precoInput.getAttribute('value');
    }

    categoriaSelectLastOption = function () {
        this.categoriaSelect.all(by.tagName('option')).last().click();
    }

    categoriaSelectOption = function (option) {
        this.categoriaSelect.sendKeys(option);
    }

    getCategoriaSelect = function () {
        return this.categoriaSelect;
    }

    getCategoriaSelectedOption = function () {
        return this.categoriaSelect.element(by.css('option:checked')).getText();
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
