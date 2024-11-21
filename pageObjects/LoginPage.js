class LoginPage {    
     username() {return cy.get('#login_username')}
     password() {return cy.get('#login_password')}
     signinBtn() {return cy.get('[type="Submit"]')}
     userAccount() {return cy.get("span[class='label label-primary currency-space']")}

    

     userLogin(username, password){
        if (username) {
            this.username().type(username)
        }
        if (password){
            this.password().type(password) 
        }
        this.signinBtn().click()
    }

     verifyErrorMessage(message){
        cy.contains(message)
            .should('be.visible')

    }

    userLogout(){
        this.userAccount().click()
        cy.contains('Sign out').click()
        cy.checkSpinner()
    }

}

export default LoginPage = new LoginPage

