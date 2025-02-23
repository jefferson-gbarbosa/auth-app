"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Teste de Cadastro', () => {
    beforeEach(() => {
        cy.visit('/register');
    });
    it('deve registrar o usuário e redirecionar para a página de verificação de email', () => {
        // Preencher o formulário de cadastro
        cy.get('input[name="name"]').type('João da Silva');
        cy.get('input[name="email"]').type('joao.silva@example.com');
        cy.get('input[name="password"]').type('Senha123!');
        // Submeter o formulário
        cy.get('button[type="submit"]').click();
        // Verifique se a página foi redirecionada para a página de verificação de e-mail
        cy.url().should('include', '/email-verification');
        // Verifique se o toast de sucesso aparece
        cy.get('.Toastify').should('contain', 'Registration completed!');
    });
});
