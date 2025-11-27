describe('Creación de Salas (compacto)', () => {
  it('crea una sección y una sala con nombre secuencial', () => {
    // la sección se crea al pulsar '+ Nueva Sección' — no hace falta poner nombre

    // Login, viewport y navegación
    cy.fixture('usuarios').then(u => cy.login(u.usuario_salas.email, u.usuario_salas.password))
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    cy.contains('a', 'Gestionar Salas', { timeout: 10000 }).click()

    // Seleccionar explícitamente una sala desde el dropdown "Seleccionar sala" si existe.
    // Luego clic en la opción "Sala Nueva" si está disponible; si no, elegir la primera opción válida.
    cy.get('body').then($b => {
      const hasSelector = $b.find('*:contains("Seleccionar sala"), *:contains("Seleccionar Sala"), button:contains("Seleccionar")').length
      if (hasSelector) {
        // abrir el selector
        cy.contains(/Seleccionar sala|Seleccionar Sala|Seleccionar/i, { timeout: 3000 }).first().click({ force: true })

        // una vez abierto, buscar la opción 'Sala Nueva' preferida
        cy.wait(200)
        cy.get('body').then($opts => {
          if ($opts.find('*:contains("Sala Nueva")').length) {
            cy.contains(/Sala Nueva/i).click({ force: true })
          } else {
            // fallback: seleccionar el primer elemento que no sea el placeholder
            const candidates = $opts.find('div[role="option"], li, .dropdown-item, .menu-item, .chakra-menu__item').filter((i, el) => {
              const t = (el.innerText || '').trim()
              return t && !/Seleccionar|Elige|Seleccione/i.test(t)
            })
            if (candidates.length) cy.wrap(candidates.first()).click({ force: true })
            else cy.log('No se detectaron opciones válidas en el dropdown de sala')
          }
        })
      } else {
        cy.log('No existe control de "Seleccionar sala" visible — no es necesaria la selección explícita')
      }
    })

    // Crear sección usando específicamente el botón '+ Nueva Sección' (prioridad absoluta)
    cy.get('body').then($b => {
      // buscar el botón exacto por texto primero
      const btnExact = $b.find('button').filter((i, el) => (el.innerText || '').trim().toLowerCase() === '+ nueva sección')
      if (btnExact.length) {
        cy.wrap(btnExact.first()).click({ force: true })
      } else {
        // fallback: botón que contenga 'Nueva Sección' (sin el +)
        const btnFuzzy = $b.find('button:contains("Nueva Sección"), button:contains("Nueva Secci")')
        if (btnFuzzy.length) cy.wrap(btnFuzzy.first()).click({ force: true })
      }

      // la UI crea la sección con el click; esperamos un momento por la actualización
      cy.wait(800)
    })

    // calcular nombre secuencial (salacreadaautomaticamenteN)
    cy.get('body').invoke('text').then(txt => {
      const matches = Array.from((txt || '').matchAll(/salacreadaautomaticamente(\d+)/gi)).map(m => parseInt(m[1], 10) || 0)
      const next = (matches.length ? Math.max(...matches) : 0) + 1
      cy.wrap(`salacreadaautomaticamente${next}`).as('nombreSala')
    })

    // intentar crear sala dentro de la sección; si no, global
    cy.get('@nombreSala').then(name => {
      // intentar primero dentro de la sección; si no, buscar globalmente
      cy.get('body').then($b => {
        // elegir el último '+ Nueva Sala' si existe (suele pertenecer a la sección recién creada)
        const allNew = $b.find('button:contains("+ Nueva Sala"), button:contains("Nueva Sala")')
        if (allNew.length) cy.wrap(allNew.last()).click({ force: true })
        else cy.contains('button', /Crear Sala|Agregar Sala|Nueva Sala/i, { timeout: 5000 }).click({ force: true })
      })

      // rellenar formulario (prioridad al input exacto indicado)
      cy.get('input[placeholder="Nombre de la sala"], [data-cy="input-nombre-sala"], input[placeholder*="Nombre"], input[name*="nombre"]').first().clear().type(name)
      cy.get('input[placeholder*="Capacidad"],[data-cy="input-capacidad-sala"],input[name*="capacidad"]').first().clear().type('120')
      cy.get('textarea[placeholder*="Descripción"],[data-cy="input-descripcion-sala"],textarea[name*="descripcion"]').first().clear().type('Sala creada automáticamente por test')

      // guardar y validar la nueva sala
      cy.contains('button', /Guardar|Crear|Agregar/i, { timeout: 5000 }).click({ force: true })
      cy.contains(name, { timeout: 15000 }).should('exist')
    })
  })
})
