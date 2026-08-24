export class BancosDeDadosPage {
  visit() {
    cy.visit('/dashboard/campanha/bancos-de-dados');
  }

  criarButton() {
    return cy.contains('button', 'Criar');
  }

  atualizarButton() {
    return cy.get('[data-testid="refresh-button"]');
  }

  perfilMenu() {
    return cy.contains('Candidato');
  }

  criarItem(nome: string) {
    this.criarButton().click();
    cy.get('[role="dialog"]').find('input').type(nome);
    cy.contains('button', 'Salvar').click();
  }

  excluirPrimeiroItem() {
    cy.get('[data-testid="excluir-icon"]').first().click();
  }
}
