import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import TopMenuPage from "../../pageObjects/TopMenuPage"
import PricingPage from "../../pageObjects/PricingPage"
import ReportsPage from '../../pageObjects/ReportsPage'
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
const dsr = '1: deal-summary'
const reportDeal = "reportDeal" + dateNow //Deal for Reports test



before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableValue(relName)
    TopMenuPage.verifySearch(relName)
    PricingPage.verifyRelationshipName(relName)
    TopMenuPage.addDeal()
    ClientWizardPage.enterDealName(reportDeal)
    ClientWizardPage.selectClient(clientName)
    ClientWizardPage.clickNext()
    ProductWizardPage.selectProduct(prdName,relationshipName,testEnv)
    ProductWizardPage.createDeal()
    ProductPage.enterMandatoryFields(testEnv)
})


describe('Create a deal and generate a report', () => {
    it('Click on Reports tab', () => {
        PricingPage.clickOnReportsTab()
     
    })
    it('Generate a Deal Summary Report', () => {
        ReportsPage.validateDSR(dsr)
        ReportsPage.clickGenerate()
    })

    it('Download the Deal Summary Report', () => {
        ReportsPage.validateDSR(dsr)
        ReportsPage.clickDownload()
    })

    it('Verify Downloaded file' ,() => {
        cy.readFile('cypress/downloads/Deal-Summary.pdf', 'binary').should(buffer => expect(buffer.length).to.be.gt(1000))
    })
})