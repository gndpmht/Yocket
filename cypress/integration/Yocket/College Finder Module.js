/// <reference types="cypress" />

describe('College Finder Module', () => {
    it("Open the home page and verify the url and title", () => {
        // open the Home page
        cy.visit('https://yocket.com/');


        // assert the url
        cy.url().should("include", "yocket");

        // // assert the title
        cy.title().should("include", "Overseas Education Consultants to Assist You in Your Higher Education Abroad");

    });
    it('click the College Finder url and assert the url', () => {
        //Click the url
        cy.get("#college-finder").click();
        //assert the url
        cy.url().should("include", "college-finder");

    })

    it('click the Mater button and assert the url', () => {
        //Click the url
        cy.contains("[type='button']", "Masters").click();
        //assert the url
        cy.url().should("include", "college-finder/masters");
    })
    //
    //Step 1 of 4 (TAKE US THROUGH YOUR DREAM EDUCATION)
    it("Fill the form", () =>{
        cy.get("#country").type("United States").wait(2000).type("{enter}");  //Where do you want to study?
        cy.get("#area_of_study").type("Computer Science").wait(2000).type("{enter}"); //What ae you planning to study?
        cy.contains("[type='submit']", "Next").click();
    
        //Step 2 of 4 (TELL US ALL ABOUT YOUR UNDERGRAD)
        cy.get("#college").type("USICT,GGSIPU").wait(2000).type("{enter}"); 
        cy.get("#major").type("Information Technology").wait(2000).type("{enter}"); 
        cy.get("#marks").type("9").wait(2000).type("{enter}"); 
        cy.contains("[type='submit']", "Next").click();

        //Step 3 of 4 (FILL YOUR TEST SCORES)
        cy.get(".grid:nth-child(2) > div:nth-child(1) > .bg-white > .text-sm").click();

        cy.get("#toefl_overall_score").type("110").type("{enter}");
        cy.get(".md\\3Agrid-cols-3 > div:nth-child(3) > .bg-white").click();
        cy.contains("[type='submit']", "Next").click();

        //MAKE YOUE EXPERIENCE COUNT
        cy.get("#work_exp").type("24");
        cy.get("#project").type("2");
        cy.contains("[type='submit']", "Find Universities").click();

        //I am unable to go anyfurther than this as the website is asking for login and for login it is asking for OTP from mobile also after login College Finder Page is loaded.
        


    })
    
     })
