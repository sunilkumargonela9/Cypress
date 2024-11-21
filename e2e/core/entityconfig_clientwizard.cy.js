import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import * as data from'../../fixtures/global_qa/config_clientwizard.json'

const username = Cypress.env('username')
const password = Cypress.env('password')

before(() => {
    cy.login(username, password)
    TopMenuPage.addDeal()
    TopMenuPage.searchRelationship('Alpha Consulting  Imported')
    TopMenuPage.selectRelValue('Alpha Consulting')
    ClientWizardPage.clickNext()
    ClientWizardPage.clickOnRelationshipDetails()
})


describe('Verify that the Client Wizard Page should have the correct headings', () => {
   let headers = ['relationshipdetails','dealDetails'] // headings that will be tested

   headers.forEach((headers) => {
      it(`Verify ${headers} card headings are correct`, () => {
         ClientWizardPage.validateHeading(headers,data)
      })
   });
});

describe('Verify Field configurations in Relationship Details Section', () => {

   before(() => {
      ClientWizardPage.clickOnViewMore()
   });
   // Fields that will be tested
   let inputTextFields = ['relationshipname','relationshipouterCustomerId','relationshiprelationshipExposure',
                           'relationshipprimaryContact','relationshipdescription']

   let dropDownFields = ['relationshipindustryCategory','relationshipcountryCode','relationshipcreditRatingCode',
                        'relationshipcountryCode','relationshipbookingStateLocation', 'relationshipcapitalClassCode',
                        'relationshipdivision','relationshipbusinessSegment','relationshipbusinessUnit','relationshipexposureCurrencyCode']

   // Tests will loop in each of the fields and check properties against the json file
   inputTextFields.forEach((field) => {
      it(`Verify ${field} input text field configurations are correct`, () => {
         ClientWizardPage.validateFieldName(field,data)
         ClientWizardPage.validateDefaultValue(field,data)
      })
   })

   dropDownFields.forEach((field) => {
      it(`Verify ${field} dropdown field configurations are correct`, () => {
         ClientWizardPage.validateFieldName(field,data)
         ClientWizardPage.validateDdlDefaultValue(field,data)
      })
   })

   it(`Verify Relationship Owner configurations are correct`, () => {
      ClientWizardPage.validateFieldName('relationshipownedBy',data)
      ClientWizardPage.validateRelationshipOwnerDefaultValue('relationshipownedBy',data)
   })
});


describe('Verify Field configurations in Deal Details Section', () => {

   // Fields that will be tested
   let inputTextFields = ['dealname','dealouterDealId','dealdealUid']

   let dropDownFields = ['dealdivision','dealcountryCode','dealbusinessSegment',
                        'dealbusinessUnit','dealcapitalClassCode']

   // Tests will loop in each of the fields and check properties against the json file
   inputTextFields.forEach((field) => {
      it(`Verify ${field} input text field configurations are correct`, () => {
         ClientWizardPage.validateFieldName(field,data)
         ClientWizardPage.validateDefaultValue(field,data)
         ClientWizardPage.validateFieldIfRequired(field,data)
      })
   })

   dropDownFields.forEach((field) => {
      it(`Verify ${field} dropdown field configurations are correct`, () => {
         ClientWizardPage.validateFieldName(field,data)
         ClientWizardPage.validateDdlDefaultValue(field,data)
         ClientWizardPage.validateFieldIfRequired(field,data)
      })

      it(`Verify ${field} dropdownlist options are correct`, () => {
         ClientWizardPage.validateDdlOptions(field, data)
         ClientWizardPage.validateDdlTotalOptions(field,data)
      })

   })

   it(`Verify Deal Owner configurations are correct`, () => {
      ClientWizardPage.validateFieldName('dealownedBy',data)
      ClientWizardPage.validateDealOwnerDefaultValue('dealownedBy',data)
   })

});

