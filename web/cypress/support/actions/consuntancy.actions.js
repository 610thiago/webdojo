Cypress.Commands.add('fillConsultancyForm', (form)=>{
        cy.get('#name').type(form.name)
        cy.get('#email').type(form.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(form.phone)
            //.should('have.value', '(41) 99916-3434')

        if (form.form === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
           .parent()
           .find('input')
           .type(form.document)
           //.should('have.value', '753.923.080-07')   
        }
        if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

         cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
            //.should('have.value', '753.923.080-07')    
        }  
     

        form.discoveryChannels.forEach((channel) => {
             cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
        })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })   

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    form.techs.forEach((tech)=>{
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type('{enter}')

    cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible')
    })
if(form.terms === true) {
cy.contains('label', 'termos de uso')
    .find('input')
    .check()
}

})

Cypress.Commands.add('submitConsultancyForm', ()=> {
    cy.contains('button', 'Enviar formulário')
       .click()
})

Cypress.Commands.add('validadeConsultancyModal', ()=>{
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .end('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

})