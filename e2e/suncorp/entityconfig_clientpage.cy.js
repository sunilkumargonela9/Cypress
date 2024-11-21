
import LeftNavigation from '../../pageObjects/LeftNavigation';
import dayjs from 'dayjs-with-plugins'
import ProductPage from '../../pageObjects/ProductPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage';
import ProspectPage from '../../pageObjects/ProspectPage';
import ClientPage from '../../pageObjects/ClientPage'
import * as data from '../../fixtures/suncorp/config_clientpage.json'




const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv') //to differentiate input fields based on test environment
const relationship_name = "Suncorp_relationship" + dateNow



describe('Verify Client page field configurations are correct', () => {
    before(() => {
        cy.login(username, password)
    });

    it('Go to client page ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()
        ProspectPage.populateRequiredFields(testEnv)
        ProspectPage.verifyRelationshipIsCreated()
        ProspectPage.editRelationshipName(relationship_name)
        ClientPage.selectClientTab()
        ClientPage.clicksOnAddClient()
    });


        it(`Verify client name input text field configurations are correct`, () => {
            let field = "clientname"
            ProductPage.validateFieldName(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProspectPage.verifyFieldDefaultValue(field,relationship_name + " Client - 1")

        })

        it("verify external client id configurations are correct", () => {
            let field = "clientouterCustomerId"
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    

    it(`Verify Relationship Owner configurations are correct`, () => {
        ClientWizardPage.validateFieldName('clientownedBy', data)
        ProspectPage.validateDealOwnerDefaultValue('clientownedBy', data)

    })

    let dropDownFields = ['clientindustryCategory','clientcreditRatingCode','clientlGD']
    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
        })

    })

})