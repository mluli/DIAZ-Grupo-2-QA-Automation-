describe('Flujo de Reserva y Adquisición de Entrada Gratuita en Ticketazo', () => {

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login');
    cy.get('input[type="email"]').type('liricusdepeche@gmail.com');
    cy.get('input[type="password"]').type('Debian1992!');
    cy.get('[data-cy="btn-login"]').click();
    cy.url().should('not.include', '/auth/login');
    cy.wait(3000) 

  });

  it('Caso para generar entrada gratuita de forma exitosa', () => {

    //cy.visit('https://ticketazo.com.ar/auth/login');  
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
    cy.contains('Entrada gratuita generada').should('be.visible').click()
    //cy.url().should('include', '/confirmacion'); 
  }); 

  it('Caso para visualizar entrada de forma exitosa', () => {
    cy.visit('https://ticketazo.com.ar/'); 
    // Agrego un timeout extendido (10s) y espero que sea visible antes de hacer click
    cy.contains('a', 'Mis entradas', { timeout: 10000 }).should('be.visible').click();
    cy.get('[data-cy="btn-ver-entradas-4"]').click();
    cy.get('button').contains('Ver entrada').first().click();
    });

  it('Caso para realizar transferencia de entrada de forma exitosa', () => {
   
    cy.get('a').contains('Mis entradas').click();
    cy.get('[data-cy="btn-ver-entradas-4"]').click();
    cy.get('button').contains('Ver entrada').first().click();
    cy.get('button').contains('Transferir Entrada').click();
    cy.get('#email').type('dlsainz2000@gmail.com.com');
    cy.get('button[type="submit"]').contains('Transferir').click();
    cy.get('.bg-primary').contains('Transferir Entrada').click({ force: true }); 

    }); 

  it('Caso para cancelar una transferencia de entrada', () => {
    cy.get('a').contains('Mis entradas').click();
    cy.get('[data-cy="btn-ver-entradas-4"]').click();
    cy.get('button').contains('Ver entrada').first().click();
    cy.get('button').contains('Transferir Entrada').click();
    cy.get('#email').type('dlsainz2000@gmail.com.com');
    cy.contains('Cancelar').click();
    cy.get('button.bg-secondary').first().click();
    cy.get('button').contains('Cerrar').click();
    cy.url().should('include', '/tickets/list');
   
    }); 
  

});