describe('Flujo de Reserva y Adquisición de Entrada Gratuita en Ticketazo', () => {

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/'); 
  });

  it('Caso para generar entrada gratuita de forma exitosa', () => {

    cy.visit('https://ticketazo.com.ar/auth/login'); 
    cy.get('input[type="email"]').type('liricusdepeche@gmail.com');
    cy.get('input[type="password"]').type('Debian1992!');
    cy.get('[data-cy="btn-login"]').click();
    cy.url().should('not.include', '/auth/login');
    cy.wait(3000)  
    cy.visit('https://ticketazo.com.ar/'); 
    cy.get('[data-cy="btn-ver-evento-10"]').click();
    cy.wait(2000)
    cy.get('.bg-primary').contains('Adquirir entrada').click();

    cy.get('.rounded-xl.shadow-md').contains('domingo,').click(); 
    
    cy.get('button').contains('hs').first().click();
    
    cy.contains('Continuar con la compra', { timeout: 20000 }).click();
  
    cy.url().should('not.include', '/auth/login');
    cy.wait(2000)
    cy.log('Buscando sector por texto (insensible a mayúsculas)...');
    cy.contains('Campo', { timeout: 10000, matchCase: false }).click({ force: true });
    
  
    cy.get('button').contains('+').click();
    
    cy.contains('Comprar 1 Entradas').should('not.be.disabled'); 
    
    cy.contains('Comprar 1 Entradas').click();
    
    cy.get('.bg-success').contains('Generar Entrada Gratuita').click(); 

    cy.url().should('include', '/confirmacion'); 
  });
});