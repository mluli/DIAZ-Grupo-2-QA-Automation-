describe('Registro de Cliente', () => {

    beforeEach(() => {
      cy.visit('https://ticketazo.com.ar/auth/registerClient')
  
    })
  
    it('ID 1 - Registro de cliente con datos válidos', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa@gmail.com', 'simpsonssa@gmail.com', 'ContraCli351#', 'ContraCli351#')
      cy.get('[data-cy="switch-establecimiento"]').click()
      //cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
      //cy.url().should('eq', 'https://ticketazo.com.ar/auth/login')
    })

    it.only('ID 3 - Registro de cliente con email sin @', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa.com', 'simpsonssa.com', 'password', 'password')
      cy.get('[data-slot="error-message"]')
          .should('contain', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "simpsonssa.com" no incluye el signo "@"')
          .and('have.length','2')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })

    it.only('ID 4 - Registro de cliente con email sin @', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa.com', 'simpsonssa.com', 'password', 'password')
      cy.get('[data-slot="error-message"]')
          .should('contain', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "simpsonssa.com" no incluye el signo "@"')
          .and('have.length','2')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })
    
    it('ID 5 - Registro de cliente con email sin dominio', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa@', 'simpsonsa@', 'password', 'password')
      cy.get('[data-slot="error-message"]')
          .should('contain', 'Introduce texto detrás del signo "@". La dirección "simpsonsa@" está incompleta.')
          .and('have.length','2')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })

    it('ID 6 - Registro de cliente sin datos', () => {
      cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
      cy.get('[data-slot="error-message"]')
        .should('have.length','10')
        .and('contain','Completa este campo')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })  

    it('ID 7 - Registro de cliente con emails que no coinciden', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa@gmail.com', 'simpsons@gmail.com', 'password', 'password')
      cy.get('[data-cy="error-message"]').should('contain', 'Los correos electrónicos no coinciden')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })

    it('ID 8 - Registro de cliente con contraseñas que no coinciden', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa@gmail.com', 'simpsonssa@gmail.com', 'Password10#', 'Password1#')
      cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
      cy.get('[data-cy="error-message"]').should('contain', 'Las contraseñas no coinciden')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })

    it('ID 9 - Registro de cliente con contraseña que no cumple los requisitos', () => {
      cy.completar_datos_cliente('Los Simpson Producciones', '30152478509', 'Av. Siempreviva 300', '3511002474')
      cy.completar_datos_ubicacion('Córdoba', 'Achiras')
      cy.completar_email_password('simpsonssa@gmail.com', 'simpsonssa@gmail.com', 'password1', 'password1')
      cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
      cy.get('[data-cy="error-message"]').should('contain', 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })
  
    
  })