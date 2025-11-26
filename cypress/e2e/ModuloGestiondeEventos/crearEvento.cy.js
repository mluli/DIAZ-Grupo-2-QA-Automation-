describe('Crear Evento', () =>{

it('Crear Evento', () => {
       cy.fixture('usuarios').then(({cliente_valido}) => {
                cy.login(cliente_valido.email, cliente_valido.password)
                })
       cy.misEventoOk()
                

})


})