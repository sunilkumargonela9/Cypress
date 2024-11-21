
class LeftNavigation {
	expandSideBar() {return cy.get('.nav-trigger-icon')}
	addProspectBtn() {return cy.contains('Add Prospect')}
	scenarioNameLnk() {return cy.get('.nav-link.level-1')}
	clientNameLnk() {return cy.get('.nav-link.level-2')}
	pendingApprovalLink() {return cy.get('[title="Pending My Approval"]')}
	spinner() { return cy.get('.spinner')}
	productNameLnk() { return cy.get("td[class='nav-link level-3']")}
	
	//SAlluri Click on >> sign to expand left Navigation
	openSideBar() {
		this.expandSideBar().click()
	}
	//Click on Add prospective button to open a Prospective page
	openProspectPage() {
		this.addProspectBtn().should('be.visible')
			.then(()=> {
				this.addProspectBtn().click()
			})

	}
	//Click on a Scenario which has the parameter value
	selectScenario(scenarioName) {
		this.scenarioNameLnk().contains(scenarioName).click()
	}
	//Click on a Client which has the paramenter value
	selectClient(clientName) {
		cy.checkSpinner()
		this.clientNameLnk().contains(clientName).click({force:true})
		//this.clientNameLnk().click({force:true})
	}
	
	openPendingApprovalList() {
		this.pendingApprovalLink().click()
	}

	verifyClientName(clientName){
		cy.checkSpinner()
		this.clientNameLnk().contains(clientName).should('be.visible')
	}

	verifyProductName(productName){
		cy.checkSpinner()
		this.productNameLnk().contains(productName).should('be.visible')
	}

	selectProduct(productName){
		cy.checkSpinner()
		this.productNameLnk().contains(productName).click()
	}

	verifyScenario(scenarioName) {
		this.scenarioNameLnk().contains(scenarioName).should('be.visible')
	}


}

export default LeftNavigation = new LeftNavigation()
