
import TopMenuPage from '../../pageObjects/TopMenuPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import * as data from'../../fixtures/suncorp/config_clientwizard.json'




const username = Cypress.env('username')
const password = Cypress.env('password')
const relationship = 'Alpha Consulting'



before(() =>{
   cy.login(username, password)
})

// Client wizard entity configuration

describe("Verify Field configurations in Client wizard Section", () => {

    it("go to clientWizard", () => {
        TopMenuPage.addDeal()
        TopMenuPage.searchRelationship(relationship)
        TopMenuPage.selectRelValue(relationship)
        ClientWizardPage.clickNext()
        ClientWizardPage.clickOnRelationshipDetails()
    })
   
        let headers = ['relationshipdetails','dealDetails'] // headings that will be tested

        headers.forEach((headers) => {
           it(`Verify ${headers} card headings are correct`, () => {
              ClientWizardPage.validateHeading(headers,data)
           })
        });

        let inputTextFields = ['relationshipname','relationshipouterCustomerId']
        inputTextFields.forEach((field) => {
            it(`Verify ${field} input text field configurations are correct`, () => {
               ClientWizardPage.validateFieldName(field,data)
               ClientWizardPage.validateDefaultValue(field,data)
            })
         })

         it(`Verify Relationship Owner configurations are correct`, () => {
            ClientWizardPage.validateFieldName('relationshipownedBy',data)
            ClientWizardPage.validateRelationshipOwnerDefaultValue('relationshipownedBy',data)
         }) 

})

describe('Verify Field configurations in Deal Details Section', () => {

    // Fields that will be tested
    let inputTextFields = ['dealname','dealouterDealId','dealdealUid']
 
 
    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field configurations are correct`, () => {
          ClientWizardPage.validateFieldName(field,data)
          ClientWizardPage.validateDefaultValue(field,data)
          ClientWizardPage.validateFieldIfRequired(field,data)
       })
    })
 
 
    it(`Verify Deal Owner configurations are correct`, () => {
       ClientWizardPage.validateFieldName('dealownedBy',data)
       ClientWizardPage.validateDealOwnerDefaultValue('dealownedBy',data)
       
    })

    it("verify secured checkbox configurations are correct", () => {
      ClientWizardPage.validateFieldName('dealisSecure',data)
      ClientWizardPage.validateFieldIfRequired('dealisSecure',data)
      ClientWizardPage.validateCheckboxLabel('Not Confidential')
    })
 
 });