class AccessPage{

    accessTab() {  return cy.get("a[title='Access']")}
    userTable() { return cy.get('.cnv-table')}
    grantAccessModal() { return cy.get("div[class*='modal-content-wrapper']")}
    

    clickAccessTab(){
        this.accessTab().click()
    }

    clickAddUser(){
        cy.checkSpinner()
        cy.contains(' Add').click()
    }
    enterUserName(user){
        this.grantAccessModal().find('input').type(user +  '{enter}', {force: true})
        cy.checkSpinner()
    }
    
    
    grantAccess(type){
        this.grantAccessModal().find('td').contains(type).click()
        cy.checkSpinner()
    }
    

    clickClose(){
        cy.checkSpinner()
        cy.contains('Close').click()
    }

    verifyAccessTypeOfUser(user,type){
        cy.wait(1000)
        cy.checkSpinner()
        this.userTable().find('th').contains('Access').parent().invoke('index').then((index) => {
            this.userTable().contains(user).parentsUntil('tbody').find('td').eq(index).
            invoke('text').then((text) => {
                expect(text.trim()).to.equal(type)
            })
        })
    }

    clickEditAccessBtn(user){
        this.userTable().contains(user).parentsUntil('tr').nextAll().
        find('cds-icon').first().click()
    }

}

export default AccessPage = new AccessPage()