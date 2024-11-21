class TopMenuPage {
  btnBack() { return cy.get('a[title="Back"]') }
  btnRefresh() { return cy.get('[title="Refresh"]') }
  searchFieldInput() { return cy.get('.search-input') }
  searchResultValue() { return cy.get('.ng-star-inserted') }
  btnAddDeal() { return cy.get('cnv-deal-wizard') }
  searchText() { return cy.get('.breadcrumb-active > span') }
  spinner() { return cy.get('.spinner') }
  searchTab() { return cy.get('.entity-types') }
  searchTableResultValue() { return cy.get('.link') }
  searchFieldRel() { return cy.get('#filtername') }
  searchRelResultValue() { return cy.get('.ng-star-inserted') }
  field(fieldName) { return cy.get("#" + fieldName + "") }
  relationship(title) { return cy.get("a[title='" + title + "']") }

  searchRelationship(searchInput) {
    this.searchFieldRel()
      .type(searchInput + '{enter}', { force: true })
    cy.checkSpinner()
  }

  selectRelValue(searchInput) {
    this.searchRelResultValue().contains(searchInput).first().click()

  }

  clickRelationshipTab() {
    this.searchTab().should('be.visible')
      .then(() => {
        this.searchTab().contains('Relationship').click()
        cy.checkSpinner()
      })
  }

  clickDealTab() {
    this.searchTab().should('be.visible')
      .then(() => {
        this.searchTab().contains('Deal').click()
        cy.checkSpinner()
      })
  }

  clickClientTab() {
    this.searchTab().should('be.visible')
      .then(() => {
        this.searchTab().contains('Client').click()
        cy.checkSpinner()
      })
  }

  clickProductTab() {
    this.searchTab().should('be.visible')
    .then(() => {
      this.searchTab().contains('Product').click()
      cy.checkSpinner()
    })
  }

  dealTestDataExist(dealName) {

    cy.writeFile('cypress/fixtures/fitb_qa/clientDealData.json', {
      createDealNew: "Yes",
    })

    this.searchTab().contains('Deal').click()
    cy.checkSpinner()
    this.searchTableResultValue().each(($e1, index, $list) => {
      const data = $e1.text().trim()
      const dataLength = $e1.text().trim().length
      const dealLength = dealName.length

      if ((data == dealName) && (dataLength == dealLength)) {
        cy.writeFile('cypress/fixtures/fitb_qa/clientDealData.json', {
          createDealNew: "No",
        })
        return false;
      }
    })
    cy.checkSpinner()
  }

  searchValue(searchInput) {
    cy.log(searchInput)
    this.searchFieldInput().type(searchInput + '{enter}', { force: true })
    cy.checkSpinner()
  }

  selectTableValue(searchInput) {
    this.searchTableResultValue().contains(searchInput).first().click()

  }

  selectTableExactVal(searchInput) {
    this.searchTableResultValue().each(($e1, index, $list) => {
      const data = $e1.text().trim()
      const dataLength = $e1.text().trim().length
      const searchLength = searchInput.length

      if ((data == searchInput) && (dataLength == searchLength)) {
        this.searchTableResultValue().eq(index).find('a').click()
        return false;
      }
    })
  }

  verifyDeletedDeal(searchInput) {

    this.searchResultValue().contains(searchInput).should('not.exist')

  }

  selectProduct(prdName) {
    cy.contains('td', prdName).click()
    this.btnCreateDeal().click()
  }

  addDeal() {
    this.btnAddDeal().click()
    cy.checkSpinner()
  }

  verifySearch(searchInput) {
    this.searchText().should('contain', searchInput)
    cy.wait(1000)
  }

  clickOnRelationship(title) {
    this.relationship(title).click()
  }

  verifySearchValueIsNotDisplayed(value) {
    cy.contains(value).should('not.be.exist')
  }

  clickViewAll() {
    cy.contains("View All").first().click()
  }

  verifyFieldIsNotEditable(fieldName) {
    this.field(fieldName).should('be.disabled')
  }

  verifyFieldIsEditable(fieldName) {
    this.field(fieldName).should('not.be.disabled')
  }

}

export default TopMenuPage = new TopMenuPage