import TopMenuPage from "./TopMenuPage"

class PricingPage {
	fieldName(fieldName) { return cy.get(`#${fieldName}`) }
	pricingTab() { return cy.get('[title="Pricing"]') }
	copyDealIcon() { return cy.get('[title="Copy Deal"] > cds-icon') }
	deleteDealPopup() { return cy.get('[type="Submit"]') }
	deleteDealIcon() { return cy.get('[title="Remove"] > cds-icon') }
	btnCancelDealPopup() { return cy.get('.btn-default') }
	btnCopyDealPopup() { return cy.get('[type="Submit"]') }
	newDealName() { return cy.get('.breadcrumb-active> span', { timeout: 30000 }) }
	popUpTitle() { return cy.get('.modal-title') }
	eleProduct() { return cy.get('.link.ng-star-inserted') }
	roeValue() { return cy.get('.result-item.ng-star-inserted') }
	productName() { return cy.get('#productname') }
	pageToolsBtn() { return cy.get('.fl-page-toolbar') }
	nextBtn() { return cy.get('.hide-on-mobile') }
	eleRelName() { return cy.get('a.breadcrumb-active') }
	outerDealIdTxt() { return cy.get('#dealouterDealId') }
	reportsTab() { return cy.get('[title="Reports"]') }
	addProduct() { return cy.get('[title="Add Product"]') }
	scenarioValues() { return cy.get("span[class*='result-item']") }
	impactValues() { return cy.get("section[class*='box card-box']") }
	btnToggle() { return cy.get('.nav-trigger.ng-star-inserted') }
	dataTables() { return cy.get("section[id*='clr-tab-content']") }
	dataBtn() { return cy.get("button[class='btn ng-star-inserted']") }
	detailsBtn() { return cy.get("button[title='Details']") }
	dealBusinessUnit() { return cy.get("#dealbusinessUnit") }


	ellipsis() { return cy.get('.dropdown > .dropdown-toggle > cds-icon[shape="ellipsis-horizontal"]') }
	ellipsisMenu() { return cy.get('[role="menuitem"]') }
	customSchedultTab() { return cy.get("button[title='Custom Schedule']") }
	customScheduleTable() { return cy.get("table[class*='table cnv-table']") }
	customScheduleLimit() { return cy.get("#1limit") }
	customScheduleUtilizationRate() { return cy.get("#1utilisationRate") }
	customScheduleCreditRatingCode() { return cy.get("#1creditRatingCode") }
	customScheduleLGD() { return cy.get("#1lgd") }
	customScheduleMarginOverReferenceRate() { return cy.get("#1marginOverReferenceRate") }
	customScheduleCapitalModel() { return cy.get("#1calcModelType") }
	customScheduleLiquidityFee() { return cy.get("input[id='1fee.LiquidityFee']") }
	customScheduleCommitmentFee() { return cy.get("input[id='1fee.CommitmentFeeCredit']") }
	customScheduleAnnualTurnOver() { return cy.get("#1annualTurnover") }
	dealName() { return cy.get("a[class='breadcrumb-active ng-star-inserted']") }
    addScenarioBtn() { return cy.get("button[title='Add Scenario']")}
	addClientBtn() { return cy.get("button[title='Add Client']")}



	//ELEMENT CLICK METHODS
	clickDeleteDealIcon() {
		this.deleteDealIcon().click()
	}

	clickDeleteProduct() {
		this.ellipsis().click()
		this.ellipsisMenu().contains('Remove').click()
	}

	collapseToggle() {
		this.btnToggle().pipe(click).should('have.attr', 'aria-expanded', 'false')
	}


	clickCopyDeal() {
		this.copyDealIcon().click()
	}

	cancelDealPopUp() {
		this.btnCancelDealPopup().click()
	}

	copyDealPopup() {
		this.btnCopyDealPopup().click()
	}

	confirmDeleteDeal() {
		this.deleteDealPopup().click()
		cy.checkSpinner()
	}
	
	saveCopiedDeal() {
		this.getBytext('Save').click()
		cy.checkSavedAlert()
		cy.checkSpinner()
	}
	//Select a product from list of products
	selectProduct(prdName) {
		this.eleProduct().eq(0).should('include.text', prdName).click()
	}

	//INPUT METHODS
	setCopiedDealName() {
		cy.log(this.getCurrentdate())
	}
	//Input new name for Product name
	selectProductName(newName) {
		this.productName().clear().type(newName)
		cy.focused().tab()
	}
	//Enter Deal Name into the text field
	enterCopiedDealName(dealName) {
		cy.checkSpinner()
		this.enterFieldValue('dealname', dealName)
		cy.focused().tab()
	}

	//Input value in a text box
	enterFieldValue(fieldName, value) {
		if (value != 'Not Applicable') {
			this.fieldName(fieldName).should('be.visible')
			this.fieldName(fieldName).clear()
			this.fieldName(fieldName).type(value)
			this.fieldName(fieldName).invoke('val').then(val => {
				expect(val).to.contain(value) // do verification before moving to the next code
			})

		}
	}
	//Input copied deal name and save the deal
	copyTestData(dealName) {
		this.clickCopyDeal()
		this.copyDealPopup()
		this.enterCopiedDealName(dealName)
		this.outerDealIdTxt().click() // this will save the new deal name. if removed, script will be flaky
			.then(() => {
				cy.wait(1000) // Wait for new deal name to complete before clicking save
				this.saveCopiedDeal()
			})
		cy.get('#pageLock').should('not.exist')
		cy.wait(2000)
	}
	//Input copied cba deal name and save the deal
	cbaTestData(dealName) {

		this.clickCopyDeal()
		this.copyDealPopup()
		this.enterCopiedDealName(dealName)
		cy.wait(2000)
		this.saveCopiedDeal()
		cy.get('#pageLock').should('not.exist')
		cy.wait(2000)
	}

	//Returns ROE value from UI and saves it as 'roe'


	getROEvalue() {
		this.roeValue().eq(2).invoke('text').as('roe')
	}

	//Returns REVENUE value from UI and saves it as 'REVENUE'
	getRevenueValue() {
		this.roeValue().eq(1).invoke('text').as('revenue')
	}

	//Returns an element that contains the given text
	getBytext(text) {
		return cy.contains(text)
	}

	//VERIFY METHODS
	//Check if the ROE parameter value is different to ROE value on UI
	verifyROEValue(roeValue) {
		this.roeValue().eq(2).should('not.have.text', roeValue)
	}

	//Check if the ROE parameter value is different to ROE value on UI
	verifyRevenueValue(revenueValue) {
		this.roeValue().eq(1).should('not.have.text', revenueValue)
	}

	// Click on Calc + Save Button on Pricing page
	ClickOnCalcPlusSaveBtn() {
		this.pageToolsBtn().contains("Calc + Save").click()
	}
	//Click on Next button in pricing page
	ClickOnNextbtn() {
		this.pageToolsBtn().contains("Next").click()
	}
	clickOnPricingTab() {
		this.pricingTab().click()
	}
	clickOnReportsTab() {
		this.reportsTab().click()
	}
	//Check if the Popup title matches the parameter value
	verifyPopupTitle(popupTitleText) {
		this.popUpTitle().should($title => {
			const title = $title.text().trim()
			expect(title).to.equal(popupTitleText)
		})
	}

	//Check if Deal Name on UI matches the parameter value
	verifyNewDealName(dealName) {
		this.newDealName().should('contains.text', dealName)
	}

	verifyRelationshipName(relName) {
		this.eleRelName()
			.invoke('attr', 'title')
			.should('eq', relName)
	}

	verifyProductName(productName) {
		this.eleProduct().contains(productName).should('have.text', productName)
	}

	clickProductName(productName) {
		cy.checkSpinner()
		this.eleProduct().contains(productName).click({ force: true })
	}

	clickAddProduct() {
		this.addProduct().click({force: true})
	}

	verifyRoeAndRevenueValues(revenue, roe) {
		this.scenarioValues().find('span').contains('Revenue').next().invoke('text').then((text) => {
			expect(text).to.include(revenue)
		})
		this.scenarioValues().find('span').contains('ROE').next().invoke('text').then((text1) => {
			expect(text1).to.include(roe)
		})
	}

	verifyRevenueValuesExistingAndWithDeal() {
		cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json')
			.then((data) => {
				this.impactValues().find('div').contains("Revenue").parent().
					nextAll().children().contains("Existing").next().invoke('text').then((text) => {
						expect(text).to.include(data.revenue)
					})

				this.impactValues().find('div').contains("Revenue").parent().
					nextAll().children().contains("With Deal").next().invoke('text').then((text) => {
						expect(text).to.include(data.revenueWithDeal)
					})

			})


	}

	verifySVAvaluesExistingAndWithDeal() {
		cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json')
			.then((data) => {
				this.impactValues().find('div').contains("SVA").parent().
					nextAll().children().contains("Existing").next().invoke('text').then((text) => {
						expect(text).to.include(data.sva)
					})

				this.impactValues().find('div').contains("SVA").parent().
					nextAll().children().contains("With Deal").next().invoke('text').then((text) => {
						expect(text).to.include(data.svaWithDeal)
					})
			})


	}

	verifyRoeValuesExistingAndWithDeal() {
		cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json')
			.then((data) => {

				this.impactValues().find('div').contains("ROE").parent().
					nextAll().children().contains("Existing").next().invoke('text').then((text) => {
						expect(text).to.include(data.roe)
					})

				this.impactValues().find('div').contains("ROE").parent().
					nextAll().children().contains("With Deal").next().invoke('text').then((text) => {
						expect(text).to.include(data.roeWithDeal)
					})



			})


	}

	verifySvaValuesExistingAndWithDeal() {
		this.impactValues().find('div').contains("SVA").parent().
			nextAll().children().contains("Existing").next().invoke('text').then((text) => {
				expect(text).to.include(data.sva)
			})

		this.impactValues().find('div').contains("SVA").parent().
			nextAll().children().contains("With Deal").next().invoke('text').then((text) => {
				expect(text).to.include(data.svaWithDeal)
			})

	}

	clickCustomSchedule() {
		this.customSchedultTab().click({ force: true })
	}

	editExternalDealId(id) {
		this.outerDealIdTxt().type(id).tab()
	}

	getCustomScheduleData() {
		var headerList = []
		this.customScheduleTable().find('th').each(($el) => {
			var headerName = $el.text()
			headerList.push(headerName)
		}).then(() => {
			var jsonData = [];
			this.customScheduleTable().find('tbody').find('tr').each(($row, rowIndex) => {
				jsonData[rowIndex] = {}
				cy.wrap($row).find('td').each(($cell, cellIndex) => {
					const text = $cell.text()
					jsonData[rowIndex][headerList[cellIndex]] = text
					const expected = { jsonData }
					cy.writeFile("cypress/fixtures/customscheduledata.json", expected)
				})
			})
		})
	}

	verifyCustomScheduleValue(fieldName, term) {
		cy.checkSpinner()
		let path = 'cypress/fixtures/customscheduledata.json'
		let path1 = 'cypress/fixtures/customschedulereportdata.json'
		cy.readFile(path).then((data) => {
			cy.readFile(path1).then((data1) => {
				for (let i = 0; i < term; i++) {
					if (fieldName === 'Utilisation Rate') {
						let value = data1.jsonData[i]['Utilisation Rate']
						let value2 = value.replace(/[^a-zA-Z0-9]/g, '');
						let report_utilizationrate = parseInt(value2) / 100
						let customSchedule_utilizationrate =
							data.jsonData[i]['Utilisation Rate'].replace(/[^a-zA-Z0-9]/g, '');
						expect(report_utilizationrate.toString()).to.equal(customSchedule_utilizationrate.trim())
					} else {
						let customSchedule = data.jsonData[i][fieldName]
						let customScheduleReport = data1.jsonData[i][fieldName]
						cy.log("custom schedule: " + fieldName + customSchedule)
						cy.log("custom schedule report: " + fieldName + customScheduleReport)
						expect(customSchedule.trim()).to.equal(customScheduleReport.trim())
					}
				}
			})
		})
	}


	updateCustomScheduleLimit(limit) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleLimit().type(limit)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleUtilizationRate(rate) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleUtilizationRate().type(rate)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleCreditRating(creditRating) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleCreditRatingCode().select(creditRating)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleLGD(lgd) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleLGD().select(lgd)
		cy.contains('Ok').click()
	}

	updateCustomScheduleMarginOverRefRate(refRate) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().next().next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleMarginOverReferenceRate().type(refRate)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleCapitalModel(capModel, turnOver) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().next().next().next().find('cnv-meta-cell').click({ force: true })
		cy.checkSpinner()
		this.customScheduleCapitalModel().select(capModel)
		this.customScheduleAnnualTurnOver().type(turnOver)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleLiquidityFee(value) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().next().next().next().next().next().next().find('cnv-meta-cell').click({ force: true })
		cy.checkSpinner()
		this.customScheduleLiquidityFee().type(value)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	updateCustomScheduleCommitmentFee(value) {
		this.customScheduleTable().find('tbody').find('tr').eq(1).find('td').first().
			next().next().next().next().next().next().next().next().next().next().find('cnv-meta-cell').click({ force: true })
		this.customScheduleCommitmentFee().type(value)
		cy.contains('Ok').click()
		cy.checkSpinner()
	}

	clickDetails() {
		this.detailsBtn().click({ force: true })
	}

	getBusinessUnitValue() {
		let path = 'cypress/fixtures/pricingpagedata.json'
		this.dealBusinessUnit().find(':selected').invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["pricingpage_BusinessUnit"] = text
				cy.writeFile(path, data)
			})
		})
	}

	clickData() {
		this.dataBtn().contains('Data').click({ force: true })
	}

	getPricingPageValue(fieldName) {
		let path = 'cypress/fixtures/pricingpagedata.json'
		cy.contains('Result Name').parent().parent().next().contains(fieldName).next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["pricingpage_" + fieldName] = text
				cy.writeFile(path, data)
			})
		})
	}
	getRevenueImpactWithDealValues(Type1, Type2) {
		let path = 'cypress/fixtures/pricingpagedata.json'
		cy.contains('Result Name').parent().parent().next().contains('Revenue').next().next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["Revenue" + Type1] = text
				cy.writeFile(path, data)
			})
		})
		cy.contains('Result Name').parent().parent().next().contains('Revenue').next().next().next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["Revenue" + Type2] = text
				cy.writeFile(path, data)
			})
		})
	}

	getROEImactValues(Type1, Type2) {
		let path = 'cypress/fixtures/pricingpagedata.json'
		cy.contains('Result Name').parent().parent().next().contains('ROE').next().next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["pricingpage_ROE" + Type1] = text
				cy.writeFile(path, data)
			})
		})
		cy.contains('Result Name').parent().parent().next().contains('ROE').next().next().next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["pricingpage_ROE" + Type2] = text
				cy.writeFile(path, data)
			})
		})

	}


	getPricingPageMultiyearForecaseData(fieldName) {
		let path = 'cypress/fixtures/pricingpagedata.json'
		cy.contains('Result Name').parent().parent().next().contains(fieldName).next().invoke('text').then((text) => {
			cy.readFile(path).then((data) => {
				data["pricingpageforecast_" + fieldName] = text
				cy.writeFile(path, data)
			})
		})
	}

	clickAddScenario(){
		cy.wait(2000)
		this.addScenarioBtn().click()
	}

	clickAddClient(){
		this.addClientBtn().click()
	}
	clickRefinancedProduct(product){
		cy.checkSpinner()
		this.eleProduct().contains(product).click({ force: true })
	}

}

export default PricingPage = new PricingPage()

