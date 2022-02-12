/// <reference types="cypress" />

describe('The Document Metadata', () => {
    beforeEach(() => {
        cy.visit('http://uitestingplayground.com/home')
    })

    it('looks inside <title> tag', () => {
        cy.get('head title').should('contain', 'UI Test Automation Playground')
    })

    it('looks inside <meta> tag for description', () => {
        cy.get('head meta[name="description"]').should(
            'have.attr',
            'content'
        )
    })

    it('looks inside <meta> tag for viewport', () => {
        cy.get('head meta[name="viewport"]').should(
            'have.attr',
            'content',
            'width=device-width, initial-scale=1, shrink-to-fit=no'
            
        )
    })

    it('looks inside <meta> tag for robots tag', () => {
        cy.get('head meta[name="robots"]').should(
            'have.attr',
            'content'
        )
    })

    it('looks inside <meta> tag for google tag', () => {
        cy.get('head meta[name="google"]').should(
            'have.attr',
            'content'
        )
    })

})