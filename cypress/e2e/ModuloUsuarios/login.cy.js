import { menuCliente, menuUsuario } from '../../support/opcionesMenu'

describe('Login y Logout', () => {

    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/login')
        cy.viewport('macbook-16')
      
      })

    it('ID 16 - Login con credenciales existentes de comprador', () => {
        cy.fixture('usuarios').then(({comprador_valido}) => {
            cy.login(comprador_valido.email, comprador_valido.password)
            cy.validarMenu(menuUsuario, menuCliente)
        })
    })

    it('ID 17 - Login con credenciales existentes de cliente', () => {
        cy.fixture('usuarios').then(({cliente_valido}) => {
            cy.login(cliente_valido.email, cliente_valido.password)
            cy.validarMenu(menuCliente, menuUsuario)
        })        
    })

    it('ID 19 - Login con email incorrecto', () => {
        cy.fixture('usuarios').then(({usuario_email_incorrecto}) => {
            cy.login(usuario_email_incorrecto.email, usuario_email_incorrecto.password)
            cy.get('[data-cy="error-message"]').should('contain', 'Correo o contraseña incorrectos')
        })        
    })

    it('ID 20 - Login con contraseña incorrecta', () => {
        cy.fixture('usuarios').then(({usuario_password_incorrecto}) => {
            cy.login(usuario_password_incorrecto.email, usuario_password_incorrecto.password)
            cy.get('[data-cy="error-message"]').should('contain', 'Correo o contraseña incorrectos')
        })    
    })

    it('ID 21 - Login sin ingresar datos', () => {
        cy.get('[data-cy="btn-login"]').click()
        cy.get('[data-slot="error-message"]')
            .should('contain', 'Completa este campo')
            .and('have.length','2')
    })
    
    it('ID 22 - Login con una cuenta no confirmada', () => {
        cy.fixture('usuarios').then(({usuario_cuenta_no_confirmada}) => {
        cy.login(usuario_cuenta_no_confirmada.email, usuario_cuenta_no_confirmada.password)
        cy.get('[data-cy="error-message"]').should('contain', 'Usuario no confirmado. Te reenviamos el link por correo.')
        })          
    })

    it('ID 23 - Logout Usuario', () => {
        cy.fixture('usuarios').then(({comprador_valido}) => {
            cy.login(comprador_valido.email, comprador_valido.password)
            cy.validarMenu(menuUsuario, menuCliente)
        })
        cy.contains('Logout').click()
        cy.url().should('eq', 'https://ticketazo.com.ar/')
        cy.validarMenu([], menuUsuario)
    })

    it('ID 23 - Logout Cliente', () => {
        cy.fixture('usuarios').then(({cliente_valido}) => {
            cy.login(cliente_valido.email, cliente_valido.password)
            cy.validarMenu(menuCliente, menuUsuario)
        })
        cy.contains('Logout').click()
        cy.url().should('eq', 'https://ticketazo.com.ar/')
        cy.validarMenu([], menuCliente)
     })
})