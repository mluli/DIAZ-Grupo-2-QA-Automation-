//Command para completar datos de usuario cliente
Cypress.Commands.add('completar_datos_cliente', (razon_social, cuit, direccion, telefono) => {
    cy.get('[data-cy="input-razon-social"]').clear().type(razon_social)
    cy.get('[data-cy="input-cuit"]').clear().type(cuit)
    cy.get('[data-cy="input-direccion"]').clear().type(direccion)
    cy.get('[data-cy="input-telefono"]').clear().type(telefono)
})

//Command para completar desplegables de ubicación de cualquier perfil
Cypress.Commands.add('completar_datos_ubicacion', (provincia, localidad) => {
    cy.get('[data-cy="select-provincia"]').clear().type(provincia)
    cy.get('ul > li > span').contains(provincia).click()
    cy.get('[data-cy="select-localidad"]').clear().type(localidad)
    cy.get('ul > li > span').contains(localidad).click()
})

//Command para completar email y password
Cypress.Commands.add('completar_email_password', (email, repemail, password, reppassword) => {
    cy.get('[data-cy="input-email"]').clear().type(email)
    cy.get('[data-cy="input-confirmar-email"]').clear().type(repemail)
    cy.get('[data-cy="input-password"]').clear().type(password)
    cy.get('[data-cy="input-repetir-password"]').clear().type(reppassword)
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://ticketazo.com.ar/auth/login')
    cy.get('[data-cy="input-email"]').clear().type(email)
    cy.get('[data-cy="input-password"]').clear().type(password)
    cy.get('[data-cy="btn-login"]').click()
    cy.url().should('eq', 'https://ticketazo.com.ar/')
  })

  Cypress.Commands.add('editarPerfilOk', () => {
    cy.get('[data-cy="btn-save-profile"]').click()
    cy.contains('¡Perfil actualizado con éxito!').should('be.visible')
  })

 