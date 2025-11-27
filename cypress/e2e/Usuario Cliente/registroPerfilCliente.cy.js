describe('Registro de Cliente', () => {

    beforeEach(() => {
      cy.visit('https://ticketazo.com.ar/auth/registerClient')
  
    })
  
    it('ID 1 - Registro de cliente con datos válidos', () => {
      cy.fixture('datosRegistroCliente').then(({cli_datos_validos}) => {
        cy.completar_datos_cliente(
          cli_datos_validos.nombre, 
          cli_datos_validos.cuit, 
          cli_datos_validos.direccion,
          cli_datos_validos.telefono)
        cy.completar_datos_ubicacion(cli_datos_validos.provincia, cli_datos_validos.localidad)
        cy.completar_email_password(cli_datos_validos.email, cli_datos_validos.email, cli_datos_validos.password, cli_datos_validos.password)
        cy.get('[data-cy="switch-establecimiento"]').click()
        cy.get('[data-cy="btn-registrarse"]').click()
        cy.url().should('eq', 'https://ticketazo.com.ar/auth/login')
      })
    })

    it('ID 4 - Registro de cliente con email sin @', () => {
      cy.fixture('datosRegistroCliente').then(({cli_email_inc1}) => {
        cy.completar_datos_cliente(
          cli_email_inc1.nombre, 
          cli_email_inc1.cuit, 
          cli_email_inc1.direccion,
          cli_email_inc1.telefono)
        cy.completar_datos_ubicacion(cli_email_inc1.provincia, cli_email_inc1.localidad)
        cy.completar_email_password(cli_email_inc1.email, cli_email_inc1.email, cli_email_inc1.password, cli_email_inc1.password)
        cy.get('[data-cy="btn-registrarse"]').click()
        cy.get('[data-slot="error-message"]')
          .should('contain', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "'+ cli_email_inc1.email + '" no incluye el signo "@"')
          .and('have.length','2')
        cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
      })
    })
    
    it('ID 5 - Registro de cliente con email sin dominio', () => {
      cy.fixture('datosRegistroCliente').then(({cli_email_inc2}) => {
        cy.completar_datos_cliente(
          cli_email_inc2.nombre, 
          cli_email_inc2.cuit, 
          cli_email_inc2.direccion,
          cli_email_inc2.telefono)
        cy.completar_datos_ubicacion(cli_email_inc2.provincia, cli_email_inc2.localidad)
        cy.completar_email_password(cli_email_inc2.email, cli_email_inc2.email, cli_email_inc2.password, cli_email_inc2.password)
        cy.get('[data-cy="btn-registrarse"]').click()
        cy.get('[data-slot="error-message"]')
          .should('contain', 'Introduce texto detrás del signo "@". La dirección "'+cli_email_inc2.email+'" está incompleta.')
          .and('have.length','2')
        cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
      })
      
    })

    it('ID 6 - Registro de cliente sin datos', () => {
      cy.get('[data-cy="btn-registrarse"]').click()
      cy.get('[data-slot="error-message"]')
        .should('have.length','10')
        .and('contain','Completa este campo')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
    })  

    it('ID 7 - Registro de cliente con emails que no coinciden', () => {
      cy.fixture('datosRegistroCliente').then(({cli_email_inc3}) => {
        cy.completar_datos_cliente(
          cli_email_inc3.nombre, 
          cli_email_inc3.cuit, 
          cli_email_inc3.direccion,
          cli_email_inc3.telefono)
        cy.completar_datos_ubicacion(cli_email_inc3.provincia, cli_email_inc3.localidad)
        cy.completar_email_password(cli_email_inc3.email, cli_email_inc3.email +".ar", cli_email_inc3.password, cli_email_inc3.password)
      cy.get('[data-cy="btn-registrarse"]').click()
      cy.get('[data-cy="error-message"]').should('contain', 'Los correos electrónicos no coinciden')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
      })
    })

    it('ID 8 - Registro de cliente con contraseñas que no coinciden', () => {
      cy.fixture('datosRegistroCliente').then(({cli_email_inc3}) => {
        cy.completar_datos_cliente(
          cli_email_inc3.nombre, 
          cli_email_inc3.cuit, 
          cli_email_inc3.direccion,
          cli_email_inc3.telefono)
        cy.completar_datos_ubicacion(cli_email_inc3.provincia, cli_email_inc3.localidad)
        cy.completar_email_password(cli_email_inc3.email, cli_email_inc3.email, cli_email_inc3.password, cli_email_inc3.password+"#9")
      cy.get('[data-cy="btn-registrarse"]').click()
      cy.get('[data-cy="error-message"]').should('contain', 'Las contraseñas no coinciden')
      cy.url().should('eq', 'https://ticketazo.com.ar/auth/registerClient')
      })
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