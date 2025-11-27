
beforeEach( () => {
    cy.viewport('macbook-15')
    cy.visit('https://ticketazo.com.ar/auth/login');
    cy.get('[data-cy="input-email"]').type('luis.perez.cordon@gmail.com');
    cy.get('[data-cy="input-password"]').type('Ac12345*');
    cy.get('[data-cy="btn-login"]').click();
  cy.contains('Gestionar Salas').should('be.visible').click();
});

describe('Gestionar salas', () => {
  it('Verificar que cree una sala correctamente', () => {
    cy.wait(4000)
    cy.get('[data-cy="input-nombre-sala"]').should('be.visible')
    cy.get('[data-cy="input-nombre-sala"]').type('sala1');
    cy.get('[data-cy="btn-guardar-layout"]').click();
    //para eseperar cy.wait(4000)
    cy.get('section[role="dialog"]').should('be.visible')
    cy.get('section[role="dialog"]').contains('button', 'Guardar').click();
    cy.get('.flex.flex-col.gap-y-0').should('be.visible')
    cy.contains('Sala guardada con éxito.').should('be.visible');
    
  });
  
   it('Verificar que cree una sala con varias secciones', () => {
    cy.wait(4000)
    cy.get('[data-cy="input-nombre-sala"]').should('be.visible')
    cy.get('[data-cy="input-nombre-sala"]').type('sala2');
    cy.get('[data-cy="btn-nueva-seccion"]').click();
    cy.get('[data-cy="select-seccion"]').should('not.contain.text', 'General');
    cy.get('[data-cy="btn-guardar-layout"]').click();
    cy.get('section[role="dialog"]').should('be.visible')
    cy.get('section[role="dialog"]').contains('button', 'Guardar').click();
    cy.contains('Sala guardada con éxito.').should('be.visible');
  })

  it('Verificar que no cree sala sin nombre', () => {
    cy.wait(4000)
    cy.get('[data-cy="input-nombre-sala"]').should('be.visible')
    cy.get('[data-cy="input-nombre-sala"]');
    cy.get('[data-cy="btn-guardar-layout"]').click();
    cy.contains('Nombre requerido').should('be.visible');
  })
 
    
   it('Verificar que no cree una sala sin ninguna sección', () => {
    cy.wait(4000)
    cy.get('[data-cy="input-nombre-sala"]').should('be.visible')
    cy.get('[data-cy="input-nombre-sala"]').type('Sala sin secciones')
    cy.contains('button', 'Editar Sala').click()
    cy.get('div.cursor-pointer > .p-2 > .justify-between > .flex > .px-0').click()
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.get('.flex.flex-col.gap-y-0').contains('Sin secciones').should('be.visible');
  })


it('Verificar que el asiento se modifican correctamente', () => {
  cy.wait(4000)
  cy.get('[data-cy="select-sala"]').click()
  cy.contains('li[role="option"]', 'sala2').click()
  cy.get('[data-cy="butaca-0-0"]').click()
  cy.get('[data-cy="butaca-0-0"] svg').should('have.class', 'lucide-accessibility')
  cy.get('[data-cy="butaca-0-0"]').click()
  cy.get('[data-cy="butaca-0-0"] svg') .should('not.exist')
  cy.get('[data-cy="butaca-0-0"]').click()
  cy.get('[data-cy="butaca-0-0"] svg').should('have.class', 'lucide-armchair')
  cy.get('[data-cy="btn-guardar-layout"]').click()
  cy.get('section[role="dialog"]').contains('button', 'Guardar').click()
  cy.contains('Sala guardada con éxito.').should('be.visible')
})

});