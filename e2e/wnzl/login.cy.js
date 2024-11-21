import LoginPage from '../../pageObjects/LoginPage'
import HomePage from '../../pageObjects/HomePage'

const username = Cypress.env('username')
const password = Cypress.env('password')
const fullName  = Cypress.env('fullName')
const homePage = Cypress.env('homePage')


beforeEach(() => {
    cy.visit('/signin') 
});



describe('Login - Unsuccessful Login', () => {
    afterEach(() => {
        LoginPage.verifyErrorMessage('You have entered an invalid username or password.')
    });
    

    it('Error Message will be displayed with user did not enter any value on username and password fields', () => {
        LoginPage.userLogin(null,null)
    })

    it('Error Message will be displayed with user enter a wrong password', () => {
        LoginPage.userLogin(username,'wrongpw11')
    })

})


describe('Login - Successful Login', () => {
    it('Verify that user will be able to login using the correct email and password.', () => {
        LoginPage.userLogin(username,password)
        HomePage.verifyHomePage(homePage,fullName)

    })

})


