describe('Crear Evento', () =>{

it('Crear Evento', () => {
   //   cy.visit('https://ticketazo.com.ar/auth/login'),
       cy.fixture('usuarios').then(({cliente_valido}) => {
            cy.login(cliente_valido.email, cliente_valido.password)
                
              })
       cy.wait(3000)
       cy.fixture('datosEvento').then(({ evento_datos_validos}) =>{
            cy.crear_evento(evento_datos_validos.titulo, evento_datos_validos.fechaano, evento_datos_validos.horario, evento_datos_validos.horariominuto,
                evento_datos_validos.nombreLugar, evento_datos_validos.calle , evento_datos_validos.altura, evento_datos_validos.codigo,
                evento_datos_validos.info 
            )
       })       

})


})