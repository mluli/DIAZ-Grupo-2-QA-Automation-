describe('Editar Perfil de Cliente', () => {

    beforeEach(() => {
        cy.session('usuario', () => {
          cy.login('lospoturku@necub.com', 'QAClient123#')
        })
        cy.visit('https://ticketazo.com.ar/editProfile')
      })

    it('ID 24 - Editar nombre del cliente', () => {
        cy.get('input[aria-label="Nombre"]').eq(0).clear().type('Super Mega Producciones')
        cy.editarPerfilOk()
    })

    it('ID 25 - Editar teléfono del cliente', () => {
        cy.get('input[aria-label="Teléfono"]').clear().type('3517001070')
        cy.editarPerfilOk()
    })

    
    it('ID 26 - Editar redes del cliente', () => {
        cy.get('input[aria-label="LinkedIn"]').clear().type('https://www.linkedin.com/company/SuperMega/')
        cy.get('input[aria-label="Twitter"]').clear().type('https://x.com/SuperMega')
        cy.get('input[aria-label="Instagram"]').clear().type('https://www.instagram.com/SuperMega/')
        cy.get('input[aria-label="TikTok"]').clear().type('https://www.tiktok.com/SuperMega/')
        cy.editarPerfilOk()
    })

    it('ID 27 - Editar redes con link no válido', () => {
        cy.get('input[aria-label="LinkedIn"]').clear().type('www.linkedin.com/company/SuperMega/')
        cy.get('input[aria-label="Twitter"]').clear().type('x.com/SuperMega')
        cy.get('input[aria-label="Instagram"]').clear().type('instagram/SuperMega/')
        cy.get('input[aria-label="TikTok"]').clear().type('.com/SuperMega/')
        cy.get('[data-cy="btn-save-profile"]').click()
        cy.get('[data-slot="error-message"]')
            .should('contain', 'Introduce una URL')
            .and('have.length','4')
    })

    it('ID 28 - Editar nombre de usuario', () => {
        cy.get('input[aria-label="Nombre de usuario"]').clear().type('supermegaar')
        cy.editarPerfilOk()
    })

    it('ID 29 - Editar nombre de usuario con uno que ya está en uso', () => {
        cy.get('input[aria-label="Nombre de usuario"]').clear().type('val_producciones')
        cy.get('[data-cy="btn-save-profile"]').click()
        cy.contains('Hubo un problema al actualizar el perfil.').should('be.visible')
        cy.contains('El nombre de usuario ya está en uso').should('be.visible')
    })

    it('ID 30 - Editar campos que no permiten edición', () => {
        cy.get('input[aria-label="Domicilio"]').should('be.disabled')
        cy.get('input[aria-label="Email"]').should('be.disabled')
        cy.get('input[aria-label="CUIT"]').should('be.disabled')
        cy.get('input[aria-label="Provincia"]').should('be.disabled')
        cy.get('input[aria-label="Localidad"]').should('be.disabled')
    })
})
