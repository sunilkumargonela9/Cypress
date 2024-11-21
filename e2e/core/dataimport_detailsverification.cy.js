import ApiPage from '../../pageObjects/apiPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import RelationshipDetailsPage from '../../pageObjects/RelationshipDetailsPage'
import RelationshipIncomePage from '../../pageObjects/RelationshipIncomePage'
import ClientDetailsPage from '../../pageObjects/ClientDetailsPage'
import * as data from'../../fixtures/global_qa/dataimportdetails.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const product = 'termloan'

before(() => {
    //Login as Admin
    cy.apiAdminLogin()
    cy.log('Admin Login done')
    ApiPage.verifyDataImportError() // Verify Data Import is successful by checking the Data Import Logs. Error log should be empty

    //Login as Normal User
    cy.login(username, password)

})

// Relationship Details Verification
describe('Verify Relationship details are correct as per imported files', () => {
    
    before(() => {
        TopMenuPage.searchValue(data.relationship.relationshipname)
        TopMenuPage.selectTableValue(data.relationship.relationshipname)
        RelationshipDetailsPage.navigateToDetailsPage()
    });

    // Fields that will be tested
    let inputTextFields = ['relationshipname','relationshipouterCustomerId','relationshiprelationshipExposure',
                            'relationshipprimaryContact','relationshipdescription']
 
    let dropDownFields = ['relationshipindustryCode','relationshipindustryCategory','relationshipcreditRatingCode',
                         'relationshipcountryCode','relationshipbookingStateLocation', 'relationshipcapitalClassCode',
                         'relationshipdivision','relationshipbusinessSegment','relationshipbusinessUnit','relationshipexposureCurrencyCode']
 
    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field details are correct`, () => {
          RelationshipDetailsPage.validateDefaultValue(field,data)
       })
    })
 
    dropDownFields.forEach((field) => {
       it(`Verify ${field} dropdown field details are correct`, () => {
          RelationshipDetailsPage.validateDdlDefaultValue(field,data)
       })
    })
 
    it(`Verify Relationship Owner details are correct`, () => {
       RelationshipDetailsPage.validateRelationshipOwnerDefaultValue('relationshipownedBy',data)
    })
 });

//Client Details Verification 
 describe('Verify Client details are correct as per imported files', () => {
    
    before(() => {
        TopMenuPage.searchValue(data.client.clientname)
        TopMenuPage.clickClientTab()
        TopMenuPage.selectTableValue(data.client.clientname)
    });

    // Fields that will be tested
    let inputTextFields = ['clientname','clientouterCustomerId']
 
    let dropDownFields = ['clientindustryCode','clientindustryCategory','clientcreditRatingCode',
                         'clientcountryCode','clientbookingStateLocation', 'clientcapitalClassCode']
 
    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field details are correct`, () => {
          ClientDetailsPage.validateDefaultValue(field,data)
       })
    })
 
    dropDownFields.forEach((field) => {
       it(`Verify ${field} dropdown field details are correct`, () => {
          ClientDetailsPage.validateDdlDefaultValue(field,data)
       })
    })
 
    it(`Verify Relationship Owner details are correct`, () => {
       RelationshipDetailsPage.validateRelationshipOwnerDefaultValue('relationshipownedBy',data)
    })
 });


// Product Details Verification
describe('Verify Product Details in General Section as per imported files', () => {

   // Fields that will be tested
   let dropDownFields = ['parentEntityId', 'creditRatingCode', 'industryCategory', 'industryCode', 'calcModelType',
         'capitalClassCode', 'productStatus']

      before(() => {
         TopMenuPage.searchValue(data[product].name)
         TopMenuPage.clickProductTab()
         TopMenuPage.selectTableValue(data[product].name)
   });

   // Tests will loop in each of the fields and check properties against the json file
   dropDownFields.forEach((field) => {
         it(`Verify ${field} dropdown field details are correct`, () => {
            RelationshipIncomePage.validateDdlValue(product, field, data)
         })
   })
});


describe('Verify Product details in  Products Attributes Section as per imported files', () => {

   // Fields that will be tested

   let inputTextFields = ['variantName', 'name', 'outerProductId', 'limit',
       'term', 'utilisationRate', 'drawnAmount', 'termInDays']

   let dropDownFields = ['subVariant', 'lgd', 'currencyCode']

   before(() => {
      TopMenuPage.searchValue(data[product].name)
      TopMenuPage.clickProductTab()
      TopMenuPage.selectTableValue(data[product].name)
   })

   // Tests will loop in each of the fields and check properties against the json file
   inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field details are correct`, () => {

           RelationshipIncomePage.validateValue(product, field, data)

       })
   })

   dropDownFields.forEach((field) => {
       it(`Verify ${field} dropdown field details are correct`, () => {
           RelationshipIncomePage.validateDdlValue(product, field, data)

       })

   })

   it(`Verify Start Date details are correct`, () => {
       RelationshipIncomePage.validateDateField(product, 'startDate', data)
   })

   it(`Verify Maturity Date details are correct`, () => {
       RelationshipIncomePage.validateDateField(product, 'maturityDate', data)
   })


})

describe('Verify Product details in Rates Section as per imported files', () => {
   // Fields that will be tested
   let inputTextFields = ['marginOverReferenceRate', 'marketPublishedRate', 'derivedInterest', 'derivedCOF', 'marginRate']

   let dropDownFields = ['refRate', 'interestRateType', 'interestRateFrequency', 'repaymentType', 'repaymentFrequency']

   before(() => {
      TopMenuPage.searchValue(data[product].name)
      TopMenuPage.clickProductTab()
      TopMenuPage.selectTableValue(data[product].name)
   })

   inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field details are correct`, () => {
           RelationshipIncomePage.validateValue(product, field, data)
       })
   })

   dropDownFields.forEach((field) => {
       it(`Verify ${field} dropdown field details are correct`, () => {
           RelationshipIncomePage.validateDdlValue(product, field, data)
       })
   })
})

describe('Verify Product details in Fees & Costs Section as per imported files', () => {
   // Fields that will be tested
   let inputTextFields = ['promotionAmount']

   let dropDownFields = ['channelName', 'promotion']

   let checkBoxes = ['fee0_isWaived', 'fee0_isAmortized']

   before(() => {
      TopMenuPage.searchValue(data[product].name)
      TopMenuPage.clickProductTab()
      TopMenuPage.selectTableValue(data[product].name)
   })

   inputTextFields.forEach((field) => {
       it(`Verify ${field} input text field details are correct`, () => {
           RelationshipIncomePage.validateValue(product, field, data)
       })
   })

   dropDownFields.forEach((field) => {
       it(`Verify ${field} dropdown field details are correct`, () => {
           RelationshipIncomePage.validateDdlValue(product, field, data)
       })
   })


   it('Verify Fees Table Values for Establishment Fee', () => {
      RelationshipIncomePage.validateFeeName(product, "Establishment Fee", data)
      RelationshipIncomePage.validatePaymentFreq(product, "Establishment Fee", data) // Need to get data with Free Freq Data. Revisit once we have data from Mayuri
      RelationshipIncomePage.validateStdFee(product, "Establishment Fee", data)
      RelationshipIncomePage.validateProposedFee(product, "Establishment Fee", data)
      RelationshipIncomePage.validateFeeIfWaived(product, "Establishment Fee", data)
      RelationshipIncomePage.validateFeeIfAmortised(product, "Establishment Fee", data)
   })

  it('Verify Fees Table Values for Liquidity Fee', () => {
   RelationshipIncomePage.validateFeeName(product, "Liquidity Fee", data)
   RelationshipIncomePage.validatePaymentFreq(product, "Liquidity Fee", data) // Need to get data with Free Freq Data. Revisit once we have data from Mayuri
   RelationshipIncomePage.validateStdFee(product, "Liquidity Fee", data)
   RelationshipIncomePage.validateProposedFee(product, "Liquidity Fee", data)
   RelationshipIncomePage.validateFeeIfWaived(product, "Liquidity Fee", data)
   RelationshipIncomePage.validateFeeIfAmortised(product, "Liquidity Fee", data)
   })

   it('Verify Fees Table Values for Commitment Fee', () => {
   RelationshipIncomePage.validateFeeName(product, "Commitment Fee", data)
   RelationshipIncomePage.validatePaymentFreq(product, "Commitment Fee", data) // Need to get data with Free Freq Data. Revisit once we have data from Mayuri
   RelationshipIncomePage.validateStdFee(product, "Commitment Fee", data)
   RelationshipIncomePage.validateProposedFee(product, "Commitment Fee", data)
   RelationshipIncomePage.validateFeeIfWaived(product, "Commitment Fee", data)
   RelationshipIncomePage.validateFeeIfAmortised(product, "Commitment Fee", data)
   })
   


});



 