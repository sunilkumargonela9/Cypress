class ClientPage {
  fieldName(fieldName) { return cy.get(`#${fieldName}`) }
  searchField() { return cy.get('#search_input') }
  searchResultValue() { return cy.getType('type') }
  clientTab() { return cy.get('[href*="counterparties"]')}
  clientName() { return cy.get("#clientname") }
  addClient() { return cy.get('.btn-outline') }
  clientcountryCode() { return cy.get('#clientcountryCode') }
  creditRatingCode() { return cy.get('#clientcreditRatingCode') }
  relationshipOwner() { return cy.get('[aria-haspopup="listbox"]') }
  save() { return cy.get(".btn[type='button']") }
  alert() { return cy.get('.alert-items') }
  role() { return cy.userrole('option') }
  savedClientName() { return cy.get('.breadcrumb-active > span')}
  clientDivisionDD() { return cy.get('#clientdivision')}
  clientBusinessUnit() { return cy.get('#clientbusinessUnit')}
  clientbranch() { return cy.get('#clientbranch')}
  clientindustryCategory() { return cy.get('#clientindustryCategory')}
  clientindustryCode() { return cy.get('#clientindustryCode')}


  verifyInheritedData(testEnv){
      this.clientName().invoke('val').then(value => {
      expect(value).to.contain(Cypress.env('addClientRel'))
    })
    switch (testEnv) {
      case 'globalqa' : {
        this.clientcountryCode().invoke('val').then(value => {
        expect(value).to.contain('13: AUS')
        })
        this.creditRatingCode().invoke('val').then(value => {
        expect(value).to.contain(Cypress.env('addClientRelCreditRating'))
        })
        cy.wait(2000)
        this.relationshipOwner().invoke('val').then(value => {
        expect(value).to.contain(Cypress.env('addClientRelOwner'))
        })
      break
      }
      case 'cba' : {
        this.clientDivisionDD().invoke('val').then(value => {
          expect(value).to.contain('2: NDEPT902731')
          })
      break
      }

      case 'cba_sandbox' : {
        this.clientDivisionDD().invoke('val').then(value => {
          expect(value).to.contain('1: NDEPT902730')
          })
      break
      }

      case 'asb' : {
        this.clientBusinessUnit().invoke('val').then(value => {
          expect(value).to.contain(Cypress.env('clientbusinessUnit'))
          })
        this.clientbranch().invoke('val').then(value => {
          expect(value).to.contain(Cypress.env('clientbranch'))
        })
      break
      }
    }
  }

  removeClientName() {
    this.clientName().clear()
  
    cy.focused().tab() 
    cy.focused().tab() // Get out of the field
    cy.wait(1000)
  }

  verifyAlertMessage(message) {
    this.alert().should('include.text',message)
  }

    //Function call to input value in text box
  enterFieldValue(fieldName, value) {
    if (value != 'Not Applicable') {
        cy.wait(1000)
        this.fieldName(fieldName).scrollIntoView().should('be.visible')
            .then(()=>{
                this.fieldName(fieldName).clear()
            })
            .then(()=>{
                this.fieldName(fieldName).type(value+ '{enter}')
            })
    }
  }  

      //Function call to select a value in dropdown
  selectDropdown(fieldName, value) {
    cy.wait(1000)
    if (value != 'Not Applicable') {
        this.fieldName(fieldName).select(value)
    }
  }
    
  btnNext() {
    return cy.get('.btn-primary.dpx-button') 
  }
  clickNext() {
    this.btnNext().click()
  }
  selectClientTab() {
    this.clientTab().click()
  }

  clicksOnAddClient() {
    this.addClient().click()
  }

  enterNewClientName(newClientName) {
    cy.wait(1000)
    this.clientName().type(newClientName + '{enter}')
  }

  enterCBAClientFields() {
    
    this.clientindustryCategory().select(Cypress.env('clientindustryCategory'))
    cy.wait(100)
    this.clientcountryCode().select(Cypress.env('addClientCountry'))
    cy.wait(100)
    this.clientindustryCode().select(Cypress.env('clientindustryCode'))
    cy.wait(100)
    this.selectDropdown('clientlgd', Cypress.env('clientlgd')) 
    this.selectDropdown('clientpdRatingCode', Cypress.env('clientpdRatingCode')) 
    

  }

  enterFITBClientFields() {
    this.enterFieldValue('clientouterCustomerId', Cypress.env('clientouterCustomerId'))
    this.selectDropdown('clientloB', Cypress.env('productloB'))   
    this.selectDropdown('clientregion', Cypress.env('productregion'))   
    this.selectDropdown('clientindustryEntity', Cypress.env('productindustryEntity'))  
    this.selectDropdown('clientpdRating', Cypress.env('productpdRating'))  
    this.selectDropdown('clientmoodysRating', Cypress.env('productmoodysRating'))  
    this.selectDropdown('clientspRating', Cypress.env('productspRating'))   
  }

  enterASBClientFields() {
    this.selectDropdown('clientindustryCategory', Cypress.env('clientindustryCategory'))   
    this.selectDropdown('clientindustryCode', Cypress.env('clientindustryCode'))   
    this.selectDropdown('clientcreditRatingCode', Cypress.env('clientcreditRatingCode'))  
    this.selectDropdown('clientlgd', Cypress.env('clientlgd'))    
  }

  enterWNZLClientFields() {
    this.selectDropdown('clientcurrentBusinessUnit', Cypress.env('clientcurrentBusinessUnit'))
    this.selectDropdown('clientcurrentChannel', Cypress.env('clientcurrentChannel'))   
    this.selectDropdown('clientmainBankInd', Cypress.env('clientmainBankInd'))  

  }
  
  enterMQGClientFields() {
    this.selectDropdown('clientbusinessUnit', Cypress.env('clientbusinessUnit'))

  }

  clickSave() {
    this.save().contains('Save').click()

  }

  verifyClientNameIfSave(newClientName) {
    this.savedClientName().should('contain',newClientName)
  }

  editExternalClientId(id){
    this.enterFieldValue('clientouterCustomerId', id)

  }
  

  enterSuncorpFields(creditratingcode,lgd) {
    this.selectDropdown('clientcreditRatingCode', creditratingcode)
    this.selectDropdown('clientlGD', lgd)
    cy.checkSpinner()

  }

  writeClientNameToJson(value){
    let path = "cypress/fixtures/suncorp/config_termloan.json"
    cy.readFile(path).then(data => {
      data.fieldsData.productparentEntityId.defaultValue  = value
      cy.writeFile(path, data)
    }) 
  }

}

export default ClientPage = new ClientPage

