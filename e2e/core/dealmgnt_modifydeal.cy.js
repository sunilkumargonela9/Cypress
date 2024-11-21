
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import TopMenuPage from "../../pageObjects/TopMenuPage"
import PricingPage from "../../pageObjects/PricingPage"
import LeftNavigation from "../../pageObjects/LeftNavigation"
import dayjs from 'dayjs'

const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const prdName = Cypress.env('prdName')
var roeValue = ''
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const relName = Cypress.env('search_relationship')
const clientName = Cypress.env('search_client')
const modifyDeal = "modifyDeal" + dateNow //Deal for Modify test



before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableValue(relName)
    TopMenuPage.verifySearch(relName)
    PricingPage.verifyRelationshipName(relName)
    TopMenuPage.addDeal()
    ClientWizardPage.enterDealName(modifyDeal)
    ClientWizardPage.selectClient(clientName)
    ClientWizardPage.clickNext()
    ProductWizardPage.selectProduct(prdName,relationshipName,testEnv)
    ProductWizardPage.createDeal()
    ProductPage.enterMandatoryFields(testEnv)
})


describe('Modify a Deal and Save', () => {
    //Save the ROE value of deal before modifying to validate the changes
    it('check the ROE value before modifying the deal', () => {
        PricingPage.getROEvalue()
       cy.get('@roe').then(roe => {
        roeValue = roe.trim()
       })
    })

    it('Select a product from the deal', () => {
        PricingPage.selectProduct(prdName)
    })

    it('Verify inherited fields are valid', () => {
        ProductPage.verifyInheritedFields(testEnv)
    })

    it('Modify field values and save', () => {
        ProductPage.modifyFieldValues('modifyrefRate','modifycrediRatingCode','modifylgd')     
    })

    //Check the ROE value comparing to the previous value
    it('Verify the roe value after modifying the deal is different to initial value', () => {
        PricingPage.verifyROEValue(roeValue)
    })

    it('Reset the field values to original values and verify the roe value' , () => {
        LeftNavigation.openSideBar()
        PricingPage.selectProduct(prdName)
        ProductPage.modifyFieldValues('refRate','creditRatingCode','productlgd')
    })

})

