import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Categoria e2e test', () => {

    let navBarPage: NavBarPage;
    let categoriaDialogPage: CategoriaDialogPage;
    let categoriaComponentsPage: CategoriaComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categorias', () => {
        navBarPage.goToEntity('categoria');
        categoriaComponentsPage = new CategoriaComponentsPage();
        expect(categoriaComponentsPage.getTitle()).toMatch(/gestaoApp.categoria.home.title/);

    });

    it('should load create Categoria dialog', () => {
        categoriaComponentsPage.clickOnCreateButton();
        categoriaDialogPage = new CategoriaDialogPage();
        expect(categoriaDialogPage.getModalTitle()).toMatch(/gestaoApp.categoria.home.createOrEditLabel/);
        categoriaDialogPage.close();
    });

    it('should create and save Categorias', () => {
        categoriaComponentsPage.clickOnCreateButton();
        categoriaDialogPage.setNomeInput('nome');
        expect(categoriaDialogPage.getNomeInput()).toMatch('nome');
        categoriaDialogPage.save();
        expect(categoriaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CategoriaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-categoria div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CategoriaDialogPage {
    modalTitle = element(by.css('h4#myCategoriaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function (nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function () {
        return this.nomeInput.getAttribute('value');
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
