"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Página Inicial (Home)', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('deve carregar a página inicial com o cabeçalho', () => {
        cy.get('h1')
            .should('contain.text', 'Tenha acesso a diversas oportunidades para desenvolvedores.')
            .and('be.visible');
        // Verificar se a descrição está visível
        cy.get('p')
            .should('contain.text', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.')
            .and('be.visible');
    });
    it('deve exibir o botão de login', () => {
        cy.get('a')
            .contains('Entrar na comunidade')
            .should('be.visible')
            .and('have.attr', 'href', '/auth-app/login');
    });
    it('deve redirecionar para a página de login ao clicar no botão', () => {
        cy.get('a')
            .contains('Entrar na comunidade')
            .click();
        cy.url().should('include', '/login');
    });
    it('deve ter o rodapé visível', () => {
        cy.get('footer')
            .should('be.visible');
    });
    it('o botão de login deve ter o estilo correto', () => {
        cy.get('a')
            .contains('Entrar na comunidade')
            .should('have.css', 'background-color', 'rgb(43, 128, 90)')
            .and('have.css', 'color', 'rgb(255, 255, 255)');
    });
});
