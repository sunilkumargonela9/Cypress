
import apiPage from '../../pageObjects/apiPage'

const baseline = 3000
const iteration = 3

before(() => {
    cy.apiLogin()
    cy.log('login done')
})

describe('Search Load Time for Customer', () => {
    it('User should be able to measure search load time for Product', () => {
        apiPage.getSearchLoadTime('Lendlease', 'Customer', iteration) 
    })

    it('Verify average of load time vs baseline for Customer', () => {
        apiPage.verifyLoadTimeAverage('search', baseline) 
    })
})

describe('Search Load Time for Client', () => {
    it('User should be able to measure search load time for client', () => {
        apiPage.getSearchLoadTime('Lendlease', 'Counterparty', iteration) 
    })

    it('Verify average of load time vs baseline for Client', () => {
        apiPage.verifyLoadTimeAverage('search', baseline) 
    })
})

describe('Search Load Time for Deal', () => {
    it('User should be able to measure search load time for Deal', () => {
        apiPage.getSearchLoadTime('awf', 'Deal', iteration) 
    })

    it('Verify average of load time vs baseline for Deal', () => {
        apiPage.verifyLoadTimeAverage('search', baseline) 
    })
})

describe('Search Load Time for Product', () => {
    it('User should be able to measure search load time for Product', () => {
        apiPage.getSearchLoadTime('Term Loan', 'Product', iteration) 
    })

    it('Verify average of load time vs baseline for Product', () => {
        apiPage.verifyLoadTimeAverage('search', baseline) 
    })
})

