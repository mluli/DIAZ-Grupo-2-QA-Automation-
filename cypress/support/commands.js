Cypress.Commands.add('loginCorrecto', (email, password) => {
    cy.visit('https://ticketazo.com.ar/auth/login')
    cy.get('[data-cy="input-email"]').type('gutu3@hotmail.com')
    cy.get('[data-cy="input-password"]').type('Lavozsigueviva0712$')
    cy.get('[data-cy="btn-login"]').click()
})

Cypress.Commands.add('cambioDeNombre', () => {
    cy.viewport(1280, 800)
    cy.contains('a', 'Editar Perfil').click() 
   // cy.get('input[placeholder="Ej: Juan Pérez"]').clear().type('Nuevo Nombre')
    cy.get('input[placeholder="Ej: Juan Pérez"]').first().type('Mi nuevo nombre')
    cy.get('[data-cy="btn-save-profile"]').click()

})


//REGISTRO DE USUARIO CLIENTE

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

//LOGIN
Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://ticketazo.com.ar/auth/login')
    cy.get('[data-cy="input-email"]').clear().type(email)
    cy.get('[data-cy="input-password"]').clear().type(password)
    cy.get('[data-cy="btn-login"]').click()    
  })

  Cypress.Commands.add('validarMenu', (visibles = [], ocultos = []) => {
    visibles.forEach(item => {
      cy.contains(item).should('be.visible')
    })
  
    ocultos.forEach(item => {
      cy.contains(item).should('not.exist')
    })
  })

  //EDITAR PERFIL CLIENTE
  Cypress.Commands.add('editarPerfilOk', () => {
    cy.get('[data-cy="btn-save-profile"]').click()
    cy.contains('¡Perfil actualizado con éxito!').should('be.visible')
  })
  

    //CREAR EVENTOS
Cypress.Commands.add('crear_evento', (titulo, fechaano, horario, horariominuto, nombreLugar, calle, altura, codigo, info) => {
    cy.visit('https://ticketazo.com.ar/newEvent')
    cy.get('[data-cy="input-titulo"]').click().clear().type(titulo)
    cy.get('[data-cy="datepicker-fecha"]').click().type(fechaano)
    cy.get('[data-cy="select-edad"]').click()
    cy.get('[data-cy="option-edad-ATP"]').click()
    cy.get('[data-cy="select-genero"]').click()
    cy.get('[data-cy="option-genero-StandUp"]').click()
    cy.get('[data-has-start-content="true"] > .relative').click().type(horario).type(horariominuto)
    cy.get('.grid > :nth-child(7) > .relative').click().type(horario).type(horariominuto)
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.get('[data-cy="option-lugar-7"]').click()
    cy.get('[data-cy="input-nombre-lugar"]').click().type(nombreLugar)
    cy.get('[data-cy="input-calle-lugar"]').click().type(calle)
    cy.get('[data-cy="input-altura-lugar"]').click().type(altura)
    cy.get('[data-cy="input-codigo-postal-lugar"]').click().type(codigo)
    cy.get('input[placeholder="Seleccione una provincia"]').click()
    cy.contains('span', 'Córdoba').click() 
    cy.get('input[placeholder="Seleccione una localidad"]').click()
    cy.contains('span', 'Agua de Oro').click()
    cy.get('[data-cy="input-info"]').click().type(info)
    cy.get('.rounded-b-large > .z-0').click()
    cy.contains('span', 'Seleccionar entrada').click()
    cy.contains('span', 'General').click()
    cy.get('input[name="capacidadEntrada0"]').type('500');
    cy.get('input[aria-label="Precio Entrada"]').type('15000');
    cy.get('.rounded-b-large > :nth-child(2)').click()
    cy.wait(5000)
    cy.get('[data-hover="true"]').click()
    cy.wait(2000)
    cy.get('.rounded-b-large > .bg-primary').click()

    cy.contains('Ocurrió un error al crear el evento. Inténtalo de nuevo.')
  .should('be.visible')
  })
  

 
