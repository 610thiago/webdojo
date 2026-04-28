describe('GET /api/users', () => {


const heroes = [
    {
        name: "Clark Kent",
        email: "clark.kent@dailyplanet.com",
        password: "pwd123"
    },
    {
        name: "Bruce Wayne",
        email: "bruce.wayne@wayneenterprises.com",
        password: "pwd123"
    },
    {
        name: "Diana Prince",
        email: "diana.prince@themiscira.gov",
        password: "pwd123"
    },
    {
        name: "Barry Allen",
        email: "barry.allen@ccpd.gov",
        password: "pwd123"
    },
    {
        name: "Arthur Curry",
        email: "arthur.curry@atlantis.org",
        password: "pwd123"
    }
];

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email)
                
                expect(found).to.not.be.undefined
                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })

}) // <--- Este é o fechamento do describe que garante que o teste seja reconhecido!