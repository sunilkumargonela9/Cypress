
import apiPage from '../../pageObjects/apiPage'
const perfTestDealId = Cypress.env('perfTestDealId')
const baseline = 3000
const iteration = 3

before(() => {
    cy.apiLogin()
    cy.log('login done')
})

describe('Deal Load Time ', () => {
    it('User should be able to measure page load time', () => {
        apiPage.getDealLoadTime(perfTestDealId, iteration)
    })

    it('Verify average of deal load time vs baseline', () => {
        apiPage.verifyLoadTimeAverage('deal', baseline)
    })
})

