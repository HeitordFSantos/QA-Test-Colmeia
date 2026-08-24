import { LoginPage } from '../pages/LoginPage';
import { BancosDeDadosPage } from '../pages/BancosDeDadosPage';

describe('Login com credenciais incorretas', () => {
  it('não deve permitir acesso ao dashboard', () => {
    const login = new LoginPage();
    login.visit();
    login.login('qa@test.com', 'senha-invalida-de-proposito');

    login.loginIncorretoModal().should('be.visible');
    login.continuarButton().should('not.exist');
    cy.url().should('not.include', '/dashboard');
  });
});

describe('Dashboard', () => {
  it('exibe conteúdo após login', () => {
    cy.loginValido();
    cy.get('main').should('not.be.empty');
  });
});

describe('Colmeia Forms', () => {
  it('carrega título ou estado vazio', () => {
    cy.loginValido();
    cy.contains('Colmeia Forms').click();

    cy.get('body').then(($body) => {
      const temHeading = $body.find('h1, h2, h3').length > 0;
      const temEstadoVazio = /nenhum|vazio/i.test($body.text());
      expect(temHeading || temEstadoVazio).to.be.true;
    });
  });
});

describe('Bancos de dados - criação', () => {
  it('atualiza a lista sem precisar clicar em atualizar', () => {
    cy.loginValido();
    const bancos = new BancosDeDadosPage();
    bancos.visit();
    bancos.criarItem('teste-automacao');

    cy.contains('teste-automacao', { timeout: 3000 }).should('be.visible');
  });
});

describe('Menu de perfil', () => {
  it('abre dropdown com opção de logout', () => {
    cy.loginValido();
    const bancos = new BancosDeDadosPage();
    bancos.perfilMenu().click();

    cy.get('[role="menu"]').should('be.visible');
    cy.contains(/sair|logout/i).should('be.visible');
  });
});

describe('Bancos de dados - listagem extensa', () => {
  it('permite rolar até o último item criado', () => {
    cy.loginValido();
    const bancos = new BancosDeDadosPage();
    bancos.visit();

    for (let i = 0; i < 20; i++) {
      bancos.criarItem(`item-${i}`);
    }

    cy.contains('item-19').scrollIntoView().should('be.visible');
  });
});

describe('Bancos de dados - botão atualizar', () => {
  it('mantém os itens existentes ao atualizar a lista', () => {
    cy.loginValido();
    const bancos = new BancosDeDadosPage();
    bancos.visit();
    bancos.criarItem('nao-deveria-sumir');
    bancos.atualizarButton().click();

    cy.contains('nao-deveria-sumir').should('be.visible');
  });
});

describe('Bancos de dados - exclusão', () => {
  it('pede confirmação antes de excluir um item', () => {
    cy.loginValido();
    const bancos = new BancosDeDadosPage();
    bancos.visit();
    bancos.criarItem('item-para-excluir');
    bancos.excluirPrimeiroItem();

    cy.get('[role="dialog"]').contains(/tem certeza|confirmar exclusão/i).should('be.visible');
  });
});
