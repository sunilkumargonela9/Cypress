
import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProspectPage from '../../pageObjects/ProspectPage';

const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv')


describe('Create relationship', () => {
    before(() => {
        cy.login(username, password)
    });

    it('Verify that user will be able to add a prospect ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()
        ProspectPage.populateRequiredFields(testEnv)
        ProspectPage.verifyRelationshipIsCreated()
    });

});