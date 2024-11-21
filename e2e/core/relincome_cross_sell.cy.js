import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import LeftNavigation from '../../pageObjects/LeftNavigation'
import dayjs from 'dayjs'

const dateNow = dayjs().unix()
const newDealName = "Cross Sell Deal" + dateNow
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('search_relationship')
const prdName = Cypress.env('prdName')
const clientName = Cypress.env('search_client')
const testEnv = Cypress.env('testEnv')
const prdcategoryName = Cypress.env('prdcategoryName')
const crossSellPrdName = Cypress.env('crossSellPrdName')
const productName = Cypress.env('productName')
const revenue = "5000"
const creditRwa = "123456"
const editrevenue = "23456"
const editcreditRwa = "52345"

before(() => {
    cy.login(username, password)
})


describe('Create deal for a cross sell product', () => {
   
    it('Search for an existing relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        PricingPage.verifyRelationshipName(searchVal) 
        TopMenuPage.verifySearch(searchVal)
    })

    it('Add deal for a client and select a product on deal wizard', () => {
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(newDealName)
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFields(testEnv, prdName)
    })

    it('Create a cross sell product for the deal', () => {
        LeftNavigation.selectClient(clientName)
        PricingPage.clickAddProduct()
        ProductWizardPage.selectProdutForCrossSell(prdcategoryName,crossSellPrdName)
        ProductWizardPage.createDeal()
    })

    it('Enter Mandatory Fields for Product and save Deal', () => {
        ProductPage.enterMandatoryFieldsCrossSell(revenue,creditRwa)
        ProductPage.clickSave()
    })

    it('verify cross sell Product Name', () => {
        PricingPage.verifyProductName(productName)
    })
})

describe('edit & Delete a cross sell product', () => {
    it('navigating to cross sell Product Name', () => {
        PricingPage.clickProductName(productName)
    })

    it('edit cross sell Product Mandatory Fields', () => {
        ProductPage.enterMandatoryFieldsCrossSell(editrevenue,editcreditRwa)
    })

    it('Delete cross sell Product', () => {
        PricingPage.clickDeleteDealIcon()
        PricingPage.confirmDeleteDeal()
    })
})