class ProductWizardPage {
	createDealBtn() { return cy.get('.btn-primary.dpx-button') }
	prodName() { return cy.get('cnv-meta-cell.ng-star-inserted') }
	addProductBtn() { return cy.get('[title="Add Product"]') }
	catSelectionBtn() { return cy.get('.catButton.child-button') }
	typeSelectionBtn() { return cy.get('.clr-accordion-header-button') }
	categoryTypes() { return cy.get('button>clr-accordion-title') }
	categoryTitles() { return cy.get("button[class*='catButton']") }
	productDetails() { return cy.get("span.ng-star-inserted") }
	selectPageDdl() { return cy.get('.pager-select') }
	productRdo() { return cy.get("tr[class*='cursor-pointer']>td>span") }




	selectProdutForCrossSell(prdcategoryName, crossSellPrdName) {
		this.categoryTypes().contains(prdcategoryName).click()
		this.categoryTitles().contains(crossSellPrdName).click()
	}

	selectNoOfProductPerPage(number) {
		this.selectPageDdl()
			.select(number)
	}

	selectProduct(prdName) {
		this.prodName().contains(prdName).click()
	}

	//Click on Create Deal button in Product wizard
	createDeal() {
		this.createDealBtn().click()
		cy.wait(2000)
		cy.checkSpinner()
	}

	//Click on Add Product button
	clickAddProduct() {
		this.addProductBtn().click()
	}

	//Click on a product category
	selectProductCat(catValue) {
		this.catSelectionBtn().contains(catValue).click()
	}

	selectProductCatExact(catValue) {
		this.catSelectionBtn().each(($e1, index, $list) => {
			const data = $e1.text().trim()
			const dataLength = $e1.text().trim().length
			const searchLength = catValue.length

			if ((data == catValue) && (dataLength == searchLength)) {
				this.catSelectionBtn().eq(index).click()
				return false;
			}
		})
	}

	validateProductName(productName, data) {
		let prdName = data.products[productName].name
		this.categoryTypes().contains(prdName).should('be.visible')
	}

	validateProductCategory(productName, categoryName, data) {
		let catName = data.products[productName].categories[categoryName].name
		this.categoryTitles().contains(catName).should('be.visible')
	}

	validateNamesAndDescription(productName, categoryName, row, data) {
		let name = data.products[productName].categories[categoryName][row].name
		let description = data.products[productName].categories[categoryName][row].description
		this.productDetails().contains(name).should('be.visible')
		this.productDetails().contains(description).should('be.visible')
		this.productRdo({ multiple: true }).should('be.visible')
	}

	selectCategory(productName, categoryName, data) {
		let catName = data.products[productName].categories[categoryName].name
		this.categoryTitles().contains(catName).click()
		cy.checkSpinner()

	}

	selectCategoryExactMatch(productName, categoryName, data) {
		let catName = data.products[productName].categories[categoryName].name
		this.categoryTitles().each(($e1, index, $list) => {
			const data = $e1.text().trim()
			const dataLength = $e1.text().trim().length
			const searchLength = catName.length

			if ((data == catName) && (dataLength == searchLength)) {
				this.categoryTitles().eq(index).click()
				return false;
			}
		})
		cy.checkSpinner()
	}

	selectCategoryType(productName, data) {
		let prdName = data.products[productName].name
		this.categoryTypes().contains(prdName).click()
		cy.checkSpinner()

	}
	//Click on product type which holds the product category
	selectProductType(typeValue) {
		this.typeSelectionBtn().contains(typeValue).click()
	}

	selectCreditTypeHeading(type) {
		this.typeSelectionBtn().contains(type).click()
	}

	selectCatTitle(product){
		this.categoryTitles().contains(product).click()
	}

}

export default ProductWizardPage = new ProductWizardPage()
