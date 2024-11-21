import TopMenuPage from '../../pageObjects/TopMenuPage';
import PricingPage from '../../pageObjects/PricingPage';
import dayjs from 'dayjs'

const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('selfApproveDeal')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const dateNow = dayjs().unix()
let dealNameDelete = '' // Terminate at deleting deal


before(() => {
	cy.login(username, password)
	TopMenuPage.searchValue(searchVal) // Select Deal to be used in testing
	TopMenuPage.clickDealTab()
	TopMenuPage.selectTableExactVal(searchVal) 
})

describe('Copy the existing deal and then delete the copied deal', () => {
	it('User should be able to copy the deal', () => {
		PricingPage.clickCopyDeal()
		PricingPage.copyDealPopup()
	})
	it('User should be able to rename, save and verify if copied deal is created', () => {
		dealNameDelete = "Delete deal "+ dateNow
		PricingPage.enterCopiedDealName(dealNameDelete)
		PricingPage.saveCopiedDeal()
		PricingPage.saveCopiedDeal()
		PricingPage.verifyNewDealName(dealNameDelete)
		cy.wait(3000)
	})

	it('User should be able to click on the delete icon for a deal', () => {
		PricingPage.clickDeleteDealIcon()
	})

	it('User should be able to validate the text on the pop up and choose cancel', () => {
		let popupTitle= "Delete this deal?"
		PricingPage.verifyPopupTitle(popupTitle)
		PricingPage.cancelDealPopUp()
	})

	it('User should be able to delete the deal', () => {
		PricingPage.clickDeleteDealIcon()
		PricingPage.confirmDeleteDeal()
		cy.wait(3000)
	})

	it('User should be able to verify if the delete deal doesnt exist', () => {
		TopMenuPage.searchValue(dealNameDelete)
		TopMenuPage.verifyDeletedDeal(dealNameDelete)
	})
})