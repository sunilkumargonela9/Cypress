class DashboardPage {
    dashboardTab() { return cy.get("a[title='Dashboard']") }
    categoryTitle() { return cy.get('span.tile-title')}
    categoryValue() { return cy.get('span.tile-content')}
    totalTitle() { return cy.get('span.title')}
    totalValue() { return cy.get('span.value')}


    clickOnDashboardTab() {
        this.dashboardTab().click()
    }

    validateYTDTotalRevenueTitle() {
        this.totalTitle().contains('Revenue').should('have.text','Revenue')
    }

    validateYTDTotalRevenueValue() {
        this.totalTitle().contains('Revenue').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {   
            expect(text).to.include(obj.YTDtotalrevenue)
            })
        })
    }

    validateYTDTotalRoeTitle() {
        this.totalTitle().contains('ROE').should('have.text','ROE')
    }

    validateYTDTotalRoeValue() {
        this.totalTitle().contains('ROE').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {   
            expect(text).to.include(obj.YTDtotalRoe)
            })
        })
    }

    validateCategoryTitles() {
        this.categoryTitle().contains('Credit Revenue').should('have.text','Credit Revenue')
        this.categoryTitle().contains('Deposit Revenue').should('have.text','Deposit Revenue')
        this.categoryTitle().contains('Service Revenue').should('have.text','Service Revenue')

    }

    validateCreditRevenueValue() {
        this.categoryTitle().contains('Credit Revenue').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {   
            expect(text).to.include(obj.YTDCreditRevenue)
            })
        })
    }

    validateDepositRevenueValue() {
        this.categoryTitle().contains('Deposit Revenue').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {   
            expect(text).to.include(obj.YTDDepositRevenue)
            })
        })
    }

    validateServiceRevenueValue() {
        this.categoryTitle().contains('Service Revenue').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {   
            expect(text).to.include(obj.YTDServiceRevenue)
            })
        })
    }
}
export default DashboardPage = new DashboardPage