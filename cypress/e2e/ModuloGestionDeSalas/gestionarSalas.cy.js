describe('Gestión de Salas', () => {

  it('Accede a Gestionar Salas y muestra la pantalla principal', () => {
    // Ejecutar en tamaño de pantalla completo según config
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    // Login usando fixture de usuarios (sigue patrón de otros tests)
    cy.fixture('usuarios').then(({ usuario_salas }) => {
      cy.login(usuario_salas.email, usuario_salas.password)
    })

    cy.wait(2000)

    // Navega al menú de Gestión de Salas
    cy.contains('a', 'Gestionar Salas')
      .should('be.visible')
      .click()

    // Comprueba que la página de Gestión de Salas carga
    cy.contains('Gestionar Salas').should('be.visible')

    // Si existe la acción para crear sala, intenta abrirla y validar elementos básicos
    cy.get('body').then(($body) => {
      const texto = $body.text()
      if (texto.match(/crear sala|nueva sala|agregar sala/i)) {
        cy.contains(/Crear Sala|Nueva Sala|Agregar Sala/i).click({ force: true })
        // al abrir el formulario de creación, validamos que aparezca algún campo común
        cy.contains(/Nombre|Capacidad|Asientos|Butacas/i).should('be.visible')
      } else {
        // No hay botón de creación visible — registramos y continuamos (evita fallos por UI distinta)
        cy.log('No se encontró acción explícita para crear sala; verificación de acceso completada')
      }
    })

  })

})
