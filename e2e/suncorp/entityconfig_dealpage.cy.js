import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProspectPage from '../../pageObjects/ProspectPage';
import ClientPage from '../../pageObjects/ClientPage';
import TopMenuPage from '../../pageObjects/TopMenuPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductPage from '../../pageObjects/ProductPage';
import dayjs from 'dayjs-with-plugins'
import * as data from '../../fixtures/suncorp/config_dealpage.json'







const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv') //to differentiate input fields based on test environment
const client_name = "suncorp_client" + dateNow
const relationship_name = "Suncorp_relationship" + dateNow
const creditRatingCode = '1'
const lgd = 'A'



describe('Verify deal page field configurations are correct', () => {
    before(() => {
        cy.login(username, password)
    });

    it('Verify that user will be able to add a relationship ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()
        ProspectPage.populateRequiredFields(testEnv)
        ProspectPage.verifyRelationshipIsCreated()
        ProspectPage.editRelationshipName(relationship_name)
        ProspectPage.clickPopUpOk()

    });

    it("Verify that user should be able to add client to the relationship", () => {
        ClientPage.selectClientTab()
        ClientPage.clicksOnAddClient()
        ClientPage.removeClientName()
        ClientPage.enterNewClientName(client_name)
        ClientPage.enterSuncorpFields(creditRatingCode, lgd)
        ClientPage.clickSave()
        ClientPage.verifyClientNameIfSave(client_name)
        TopMenuPage.addDeal()
    })

    it("verify deal name input field configurations are correct", () => {
        let field = 'dealname'
        ProductPage.validateFieldName(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProspectPage.verifyFieldDefaultValue(field,relationship_name+" Deal - 1")

    })

    let inputTextFields = ['dealouterDealId', 'dealdealUid']
    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    })

    it(`Verify Deal Owner configurations are correct`, () => {
        ClientWizardPage.validateFieldName('dealownedBy',data)
        ProspectPage.validateDealOwnerDefaultValue('dealownedBy',data)
        
     })
 
     it("verify secured checkbox configurations are correct", () => {
       ClientWizardPage.validateFieldName('dealisSecure',data)
       ClientWizardPage.validateFieldIfRequired('dealisSecure',data)
     })

})