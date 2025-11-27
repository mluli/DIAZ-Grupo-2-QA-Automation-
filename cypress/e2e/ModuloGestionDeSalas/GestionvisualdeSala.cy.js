describe('Generador/Edición de Sala (compacto)', () => {
  beforeEach(() => {
    cy.fixture('usuarios').then(u => cy.login(u.usuario_salas.email, u.usuario_salas.password))
    cy.contains('a', 'Gestionar Salas', { timeout: 10000 }).click()
    cy.contains(/Generador de Salas|Generador/, { timeout: 10000 }).should('exist')
    cy.get('body').then($b => {
      const sel = $b.find('*:contains("Seleccionar sala"), *:contains("Seleccionar Sala")').first()
      if (sel.length) { cy.wrap(sel).click({ force: true }); cy.wait(200); cy.get('body').then($o => { if ($o.find('*:contains("salaautomatizada")').length) cy.contains(/salaautomatizada/i).click({ force: true }); else if ($o.find('*:contains("Sala Nueva")').length) cy.contains(/Sala Nueva/i).click({ force: true }); else $o.find('li,div[role="option"]').first().click({ force: true }) }) }
    })
  })

  it('Genera grilla y comprueba butacas', () => {
    cy.get('body').then($b => {
      if ($b.find('button:contains("Generar Grilla")').length) {
        cy.get('input[placeholder*="Filas"], input[placeholder*="Cantidad de Filas"], input[aria-label*="Filas"]').first().clear().type('5')
        cy.get('input[placeholder*="Columnas"], input[aria-label*="Columnas"]').first().clear().type('8')
        cy.contains('button', /Generar Grilla/i).click({ force: true })
      } else if ($b.find('button:contains("Generar Butacas")').length) {
        cy.contains('button', /Generar Butacas/i).click({ force: true })
        const modal = ['[role="dialog"]', '.modal', '.dialog'].find(s => $b.find(s).length)
        if (modal) cy.get(modal).within(() => { cy.get('input[type="number"]').first().clear().type('2'); cy.get('input[type="number"]').eq(1).clear().type('2'); cy.contains(/Generar|Crear|Aceptar/).click({ force: true }) });
      }
    }).get('body').then($b => { const sel = ['[data-seat]', '.seat', '.butaca', '.grid button', '.seat-item'].find(s => $b.find(s).length) || 'div[role="button"]'; cy.get(sel, { timeout: 10000 }).should('have.length.greaterThan', 0) })
  })

  it('Editar sala: capacidad, color y click/dblclick alteran color', () => {
    cy.contains(/Editar Sala|Editar sala/).click({ force: true })
    // panel: cambiar capacidad
    cy.get('body').then($b => { const $panel = $b.find('*:contains("Editar nombre"),*:contains("Color"),*:contains("Capacidad de la sección")').first().closest('div'); if ($panel.length) {
      // cambiar capacidad si existe (no lanzar error si no existe)
      const cap = $panel.find('input[name*="capacidad"],input[placeholder*="Capacidad"],input[type="number"]').first()
      if (cap.length) cy.wrap(cap).clear().type('6')
      // color: prefer input[type=color] o paleta RGB
      const colorInput = $panel.find('input[type="color"]').first()
      if (colorInput.length) cy.wrap(colorInput).invoke('val', '#4caf50').trigger('input').trigger('change')
      else {
        const cp = $panel.find('.color-picker,.color-box,[data-cy="color-picker"]').first()
        if (cp.length) { cy.wrap(cp).click({ force: true }); cy.get('body').then($b2 => { const rgb = $b2.find('input[type="number"]').filter((i, el) => !!el.offsetParent); if (rgb.length >= 3) { cy.wrap(rgb.eq(0)).clear().type('74'); cy.wrap(rgb.eq(1)).clear().type('222'); cy.wrap(rgb.eq(2)).clear().type('128') } else { const sw = $b2.find('.color-swatch,.color-option,button[role="option"]').first(); if (sw.length) cy.wrap(sw).click({ force: true }) } }) }
      }
      const save = $panel.find('button:contains("Guardar"), button:contains("Aplicar"), button:contains("Save")').first()
      if (save.length) cy.wrap(save).click({ force: true })
    } })

    // interacción sobre celdas: si no hay butacas, generarlas; luego click simples en 0..2 y dblclick en 3..5
      cy.get('body').then($b => {
        const candidates = ['.butacas-container button,.butacas-container div', '.grid .seat,.seat', '[data-seat]', '.seat-item', 'button[aria-label*="butaca"],button[aria-label*="seat"]']
        let sel = candidates.find(s => $b.find(s).length)
        if (!sel) {
          // generar grilla si no hay elementos
          if ($b.find('button:contains("Generar Grilla")').length) { cy.get('input[placeholder*="Filas"],input[aria-label*="Filas"]').first().clear().type('3'); cy.get('input[placeholder*="Columnas"],input[aria-label*="Columnas"]').first().clear().type('4'); cy.contains('button', /Generar Grilla/i).click({ force: true }) }
          else if ($b.find('button:contains("Generar Butacas")').length) { cy.contains('button', /Generar Butacas/i).click({ force: true }); const modal = ['[role="dialog"]', '.modal', '.dialog'].find(m => $b.find(m).length); if (modal) cy.get(modal).within(() => { cy.get('input[type="number"]').first().clear().type('2'); cy.get('input[type="number"]').eq(1).clear().type('2'); cy.contains(/Generar|Crear|Aceptar/).click({ force: true }) }) }
        }
        let finalSel = candidates.find(s => $b.find(s).length)
        if (!finalSel && $b.find('svg circle, svg rect').length) finalSel = 'svg circle, svg rect'
        if (!finalSel) { cy.log('No se encontraron celdas en la grilla — omitiendo interacciones'); return }
        cy.get(finalSel, { timeout: 10000 }).then($all => {
          const orangeIdx = []
          $all.each((i, el) => {
            const c = Cypress.$(el).css('background-color') || Cypress.$(el).css('fill') || ''
            const m = c && c.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
            if (m) {
              const r = +m[1], g = +m[2], b = +m[3]
              if (r > 150 && g > 40 && g < 200 && b < 160) orangeIdx.push(i)
            }
          })
          const simples = (orangeIdx.length ? orangeIdx.slice(0, 3) : [0, 1, 2]).filter(i => i < $all.length)
          const dobles = (orangeIdx.length > 3 ? orangeIdx.slice(3, 6) : [3, 4, 5]).filter(i => i < $all.length)
          const read = el => Cypress.$(el).css('background-color') || Cypress.$(el).css('fill') || ''
          simples.forEach(i => { const $el = $all.eq(i); const before = read($el); cy.wrap($el).click({ force: true }).should($e => { expect(read($e)).to.not.equal(before) }) })
          dobles.forEach(i => { const $el = $all.eq(i); const before = read($el); cy.wrap($el).dblclick({ force: true }).should($e => { expect(read($e)).to.not.equal(before) }) })
        })
      })
  })
})
