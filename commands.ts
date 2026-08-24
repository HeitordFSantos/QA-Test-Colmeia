import { LoginPage } from '../pages/LoginPage';

Cypress.Commands.add('loginValido', () => {
  const login = new LoginPage();
  login.visit();
  login.login('qa@test.com', 'senha-valida');
  cy.url().should('include', '/dashboard');
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginValido(): Chainable<void>;
    }
  }
}
