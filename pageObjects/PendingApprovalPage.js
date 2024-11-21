class PendingApprovalPage {
	pendingApprovalTitle() { return cy.get('[title="Pending My Approval"]')}
	columnsHeadings() { return cy.get('th[class^= "sort"]')}
	dealRowLlb() { return cy.get('td')}



	verifyPageTitle() {
		this.pendingApprovalTitle().should('be.visible')
	}

	verifyColumns(columns) {
		let i = 0
		
		while (i < columns.length ) { //Iterate on the column heading provided in the test files
			this.columnsHeadings()
				.eq(i)
				.should('have.text', columns[i])
			i++
		}
	}

	selectDealForApproval(dealName){
		this.dealRowLlb().contains(dealName).click()
	}
}

export default PendingApprovalPage = new PendingApprovalPage()
