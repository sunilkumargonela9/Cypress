import ClientPage from '../../pageObjects/ClientPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import dayjs from 'dayjs'


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('addClientRel')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const newClientName = "New Client Name" + dayjs().unix()


before(() => {
    cy.login(username, password)
});

describe('Select Existing Relationship', () => {
    it('Search for an existing relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        TopMenuPage.verifySearch(searchVal)
        ClientPage.selectClientTab()
        ClientPage.clicksOnAddClient()
        ClientPage.verifyInheritedData()
    });
});

describe('Error message should be displayed with user click Save without required fields populated', () => {
    it('Error message will be displayed when user forgot to populate a required field', () => {
        ClientPage.removeClientName()
        ClientPage.clickSave()
        ClientPage.verifyAlertMessage('[1 errors] Client Name')


    });
});


describe('User should be able to create New Client after populating required fields', () => {
    it('User should enter required fields and save new client', () => {
        ClientPage.enterNewClientName(newClientName)
        ClientPage.clickSave()
        ClientPage.verifyClientNameIfSave(newClientName)
    });


});


