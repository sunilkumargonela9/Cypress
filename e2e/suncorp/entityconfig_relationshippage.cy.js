
import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProductPage from '../../pageObjects/ProductPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage';
import ProspectPage from '../../pageObjects/ProspectPage';
import * as data from '../../fixtures/suncorp/config_relationship.json'




const username = Cypress.env('username')
const password = Cypress.env('password')



describe('Verify client page field configurations are correct', () => {
    before(() => {
        cy.login(username, password)
    });

    it('Go to relationship page ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()

    });

    let inputTextFields = ["relationshipname","relationshipouterCustomerId"]

    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    })

    it(`Verify Relationship Owner configurations are correct`, () => {
        ClientWizardPage.validateFieldName('relationshipownedBy',data)
        ProspectPage.validateDealOwnerDefaultValue('relationshipownedBy',data)
        
     })

})