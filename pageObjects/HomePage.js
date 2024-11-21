class HomePage {    
     expandSideBar() {return cy.get('.nav-trigger-icon')}
     addProspect() {return cy.contains('Add Prospect')}
     userFullName() {return cy.get("span.hidden-sm")}


     openSideBar(){
        this.expandSideBar().click()
    }

     openProspectPage(){
        this.addProspect().click()
    }

     verifyHomePage(url,fullName){
        cy.url().should("include", url);
        this.userFullName().should('include.text',fullName)
    }
    
}

export default HomePage = new HomePage
