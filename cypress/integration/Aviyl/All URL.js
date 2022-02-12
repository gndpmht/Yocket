describe('Loading of the webpage', () => {

    it('Loads the Webpage', () => {
        cy.visit('http://uitestingplayground.com/home')

    })
    

    it('Verifies the hyperlinks are broken or not', () => {
        
        cy.get("a:not([href*='mailto:]']").each($el => {
            cy.request({ url: $el.attr('href'), failOnStatusCode: true }).then((response) => {
                expect(response.status).to.eq(200)

            })

        })


    })


    it('Verifies the hyperlinks are broken or not on Resources page ', () => {

        cy.get("a[href*='resources']").click()
        cy.get("a:not([href*='mailto:]']").each($el => {
            cy.request({ url: $el.attr('href'), failOnStatusCode: true }).then((response) => {
                expect(response.status).to.eq(200)

            })

        })

        

    })
    it('Loads the Webpage', () => {
        cy.visit('http://uitestingplayground.com/home453')
    })
})