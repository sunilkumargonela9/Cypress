
class ClientWizardPage {
   btnNext() { return cy.get('.btn-primary.dpx-button') }
   clientNameField() { return cy.get('.cparty.ng-star-inserted') }
   txtDealName() { return cy.get('#dealname') }
   wizardHeader() { return cy.get('.modal-title') }
   headings() { return cy.get('.card-header') }
   owner() { return cy.get("input[id*='clr-form-control']") }
   fieldElementValue(field) { return cy.get(`*[id*="${field}"]`) }
   fieldElementName(field) { return cy.get(`label[for="${field}"]`) }
   drpDwnfieldElement(field) { return cy.get(`select[id="${field}"]`) }
   viewMoreBtn() { return cy.get("button[class='view-more']") }
   pricingModel() { return cy.get("#dealbusinessSegment") }
   dealCapitalClassCode() { return cy.get("#dealcapitalClassCode") }
   securedChkToggle() { return cy.get("div[class='checkbox-toggle']") }
   eligibleForResidential() { return cy.get("label[for='dealeligibleForResidentialRW']") }



   //Click Next button. Click Next again if the page does not change
   clickNext() {
      this.btnNext().click()
      this.wizardHeader().then($header => {
         const header = $header.text().trim()
         if (header == 'Select Client') {
            this.btnNext().click()
         }
      })
      //Select one Client with parameter value from the list of Clients in the Wizard
   }
   selectClient(clientName) {
      this.clientNameField().contains(clientName).click()
   }
   //Enter Deal Name with parameter value in the text box
   enterDealName(dealName) {
      this.txtDealName().clear()
      this.txtDealName().type(dealName + '{enter}')
      cy.focused().tab()
      cy.wait(2000)
   }
   //Search for Relationship Name and click 
   selectRelationshipName() {
      this.selectRelationship().click()
   }

   clickOnRelationshipDetails() {
      cy.contains('Relationship Details').click()
   }

   clickOnDealDetails() {
      cy.contains('Deal Details').click()
   }

   clickOnClientDetails() {
      cy.contains('Client Details').click()
   }

   clickOnViewMore() {
      this.viewMoreBtn().click()
   }

   validateRelationshipOwnerDefaultValue(fieldtovalidate, data) {
      let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
      this.owner().eq(0).should('have.value', defaultValue)
   }

   validateDealOwnerDefaultValue(fieldtovalidate, data) {
      let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
      this.owner().eq(1).should('have.value', defaultValue)
   }

   validateFieldName(fieldtovalidate, data) {
      let fieldName = data.fieldsData[fieldtovalidate].fieldName
      this.fieldElementName(fieldtovalidate).should('have.text', fieldName)
   }

   validateDefaultValue(fieldtovalidate, data) {
      let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
      this.fieldElementValue(fieldtovalidate).should('include.value', defaultValue)
   }

   validateFieldIfRequired(fieldtovalidate, data) {
      let isRequired = data.fieldsData[fieldtovalidate].isRequired

      cy.log("Is the field required? " + isRequired)

      if (isRequired == "Y") {
         this.fieldElementName(fieldtovalidate).invoke('attr', 'class').then(text => {
            expect(text).to.include('required')
         })
      } else {

         this.fieldElementName(fieldtovalidate).invoke('attr', 'class').then(text => {
            expect(text).not.to.include('required')
         })
      }

   }

   validateDdlDefaultValue(fieldtovalidate, data) {
      let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
      this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text', defaultValue)
   }

   validateDdlOptions(fieldtovalidate, data) {
      let option = data.fieldsData[fieldtovalidate].options
      let lenght = data.fieldsData[fieldtovalidate].lenght

      cy.log('field to test =  ' + fieldtovalidate)
      cy.log('option lenght = ', lenght)
      cy.log('array = ' + option)

      this.drpDwnfieldElement(fieldtovalidate).find('option')
         .should('have.length', lenght)

      option.forEach(field => {
         this.drpDwnfieldElement(fieldtovalidate).find('option')
            .should('include.text', field)
      });
   }

   validateDdlTotalOptions(fieldtovalidate, data) {
      let lenght = data.fieldsData[fieldtovalidate].lenght

      cy.log('field to test =  ' + fieldtovalidate)
      cy.log('option lenght = ', lenght)

      this.drpDwnfieldElement(fieldtovalidate).find('option')
         .should('have.length', lenght)
   }

   validateHeading(fieldtovalidate, data) {
      let value = data.fieldsData.headings[fieldtovalidate]
      this.headings().contains(value).should('be.visible')
   }

   fillSuncorpClientWizaredFeileds(pricingmodel, classcode) {
      cy.wait(1000)
      this.pricingModel().select(pricingmodel)
      cy.wait(1000)
      this.dealCapitalClassCode().select(classcode)
      cy.checkSpinner()
   }

   validateCheckboxLabel(label) {
      this.securedChkToggle().next().invoke('text').then((text) => {
         expect(text).to.equal(label)
      })
   }

   verifyEligibleForResidentialRule() {
      this.pricingModel().select('Development Finance')
      cy.wait(2000)
      this.eligibleForResidential().first().should('be.visible')
   }

}

export default ClientWizardPage = new ClientWizardPage