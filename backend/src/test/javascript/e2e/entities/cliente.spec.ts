import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Cliente e2e test', () => {

    let navBarPage: NavBarPage;
    let clienteDialogPage: ClienteDialogPage;
    let clienteComponentsPage: ClienteComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clientes', () => {
        navBarPage.goToEntity('cliente');
        clienteComponentsPage = new ClienteComponentsPage();
        expect(clienteComponentsPage.getTitle()).toMatch(/gestaoApp.cliente.home.title/);

    });

    it('should load create Cliente dialog', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage = new ClienteDialogPage();
        expect(clienteDialogPage.getModalTitle()).toMatch(/gestaoApp.cliente.home.createOrEditLabel/);
        clienteDialogPage.close();
    });

    it('should create and save Clientes', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage.setNomeInput('nome');
        expect(clienteDialogPage.getNomeInput()).toMatch('nome');
        clienteDialogPage.setDataNascInput(12310020012301);
        expect(clienteDialogPage.getDataNascInput()).toMatch('2001-12-31T02:30');
        clienteDialogPage.setTelefoneInput('telefone');
        expect(clienteDialogPage.getTelefoneInput()).toMatch('telefone');
        clienteDialogPage.save();
        expect(clienteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClienteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cliente div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClienteDialogPage {
    modalTitle = element(by.css('h4#myClienteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    dataNascInput = element(by.css('input#field_dataNasc'));
    telefoneInput = element(by.css('input#field_telefone'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function (nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function () {
        return this.nomeInput.getAttribute('value');
    }

    setDataNascInput = function (dataNasc) {
        this.dataNascInput.sendKeys(dataNasc);
    }

    getDataNascInput = function () {
        return this.dataNascInput.getAttribute('value');
    }

    setTelefoneInput = function (telefone) {
        this.telefoneInput.sendKeys(telefone);
    }

    getTelefoneInput = function () {
        return this.telefoneInput.getAttribute('value');
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
