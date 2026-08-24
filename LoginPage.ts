export class LoginPage {
  visit() {
    cy.visit('/');
  }

  fillEmail(email: string) {
    cy.get('input[name="email"]').clear().type(email);
    return this;
  }

  fillPassword(password: string) {
    cy.get('input[name="password"]').clear().type(password);
    return this;
  }

  submit() {
    cy.contains('button', 'Entrar').click();
  }

  login(email: string, password: string) {
    this.fillEmail(email).fillPassword(password);
    this.submit();
  }

  loginIncorretoModal() {
    return cy.contains('Seu login está incorreto');
  }

  continuarButton() {
    return cy.contains('button', 'Continuar');
  }
}
