import ApprovalPage from "./ApprovalPage"
class RelationshipIncomePage {

    relationshipIncomeTab() { return cy.get("a[title='Relationship Income']") }
    plusFutureCrossSellBtn() { return cy.get('.tab-sub-header > .btn') }
    categoryDdl() { return cy.get("#category") }
    productVariantDdl() { return cy.get("#productType") }
    productNameDdl() { return cy.get("#name") }
    potentialRevenue() { return cy.get("#limit") }
    term() { return cy.get("#term") }
    probability() { return cy.get("#probability") }
    datePicker() { return cy.get("button[title='Choose date']") }
    monthDatePicker() { return cy.get("button[class*='monthpicker-trigger']") }
    yearDatePicker() { return cy.get("button[class*='yearpicker-trigger']") }
    averageBalance() { return cy.get("#averageBalance") }
    currencyCode() { return cy.get("#currencyCode") }
    creditRwa() { return cy.get("#creditRWA") }
    roe() { return cy.get("#roe") }
    revenue() { return cy.get('#marginAmount') }
    comments() { return cy.get("#comments") }
    okBtn() { return cy.get("button[class*='btn-primary n']") }
    futureCrossSellTab() { return cy.get("button[id*='clr-tab-link']").contains("Future Cross Sell") }
    editBtn() { return cy.get("cds-icon[shape='pencil']").first() }
    deleteBtn() { return cy.get("cds-icon[shape='trash']").first() }
    yesBtn() { return cy.contains("Yes") }
    applyChanges() { return cy.get("[title = 'Apply Changes']")}
    fieldElementValue(field) { return cy.get(`*[id*="${field}"]`) }
    dateFieldName(field) { return cy.get(`[for="${field}"]`) }
    drpDwnfieldElement(field) { return cy.get(`select[id="${field}"]`) }
    feeNameLabel() { return cy.get('.title > span') }
    paymentFreqDdl() { return cy.get('tbody select.ng-star-inserted') }
    stdFeeInput() { return cy.get('[id*="standard"]') }
    proposedFeeInput() { return cy.get('[id*="proposed"]') }
    isWaiveChkBox() { return cy.get('[id*="isWaive"]') }
    isAmortisedChkBox() { return cy.get('[id*="isAmortised"]') }
    forecastRevenue() { return cy.get('td.right.alt-bg.lifetime.ng-star-inserted') }
    forecastDepositRevenue() { return cy.get(".pointer .lifetime") }
    titles() { return cy.get('div.card-title.result-label') }
    clientList() { return cy.get('tr.ng-star-inserted') }
    tab() { return cy.get('[role="presentation"]') }
    pageSelect() { return cy.get('.pager-select') }
    existingProducts() { return cy.get('.tab-header-label > .badge') }
    categories() { return cy.get('td.left.category.ng-star-inserted') }
    historicalRevenue() { return cy.get('td.right.historical.ng-star-inserted') }
    total() { return cy.get('td.left.total-label.ng-star-inserted') }
    totalForecastRevenue() { return cy.get('td.right.left-border.alt-bg.lifetime.ng-star-inserted') }
    ytdTotal() { return cy.get('td.right.left-border.historical.ng-star-inserted') }

    

    fieldElementValue(field) { return cy.get(`*[id*="${field}"]`) }
    dateFieldName(field) { return cy.get(`[for="${field}"]`) }
    drpDwnfieldElement(field) { return cy.get(`select[id="${field}"]`) }
    feeNameLabel() { return cy.get('.title > span') }
    paymentFreqDdl() { return cy.get('tbody select.ng-star-inserted') }
    stdFeeInput() { return cy.get('[id*="standard"]') }
    proposedFeeInput() { return cy.get('[id*="proposed"]') }
    isWaiveChkBox() { return cy.get('[id*="isWaive"]') }
    isAmortisedChkBox() { return cy.get('[id*="isAmortised"]') }
    relationshipValues() { return cy.get("div[class='card-block']") }
    modifyIcon() { return cy.get("cds-icon[title='Amend']")}
    applyChangeBtn() { return cy.get('.btn-refinance')}
    refinanceBtn() { return cy.get("[title='Refinance']")}
    revertIcon() { return cy.get("cds-icon[title='Revert']")}
    


    validateTotalRevenueTitle() {
        this.titles().contains('Total').should('have.text', 'Total')
    }

    validateCreditRevenueTitle() {
        this.titles().contains('Credit').should('have.text', 'Credit')
    }

    validateDepositRevenueTitle() {
        this.titles().contains('Deposit').should('have.text', 'Deposit')
    }

    writeTitleValues() {
        this.titles().contains('Total').next().invoke('text').then((text) => { 
            cy.writeFile('cypress/fixtures/relationshipincomeData.json', { totalrevenue: text })
        })

        this.titles().contains('Credit').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.creditrevenue = text
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })

        this.titles().contains('Deposit').next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.depositrevenue = text
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    validateTitleValues() {
        cy.readFile('cypress/fixtures/relationshipincomeData.json')
            .then((data) => {
                this.titles().contains('Total').next().invoke('text').then((text) => {
                    expect(text).to.include(data.totalrevenue)
                })
        
                this.titles().contains('Credit').next().invoke('text').then((text) => {
                    expect(text).to.include(data.creditrevenue)
                })
        
                this.titles().contains('Deposit').next().invoke('text').then((text) => {
                    expect(text).to.include(data.depositrevenue)
                })

            })

    }

    validateCategories() {
        this.categories().contains('Commercial Lending').should('have.text', "Commercial Lending")
        this.categories().contains('Deposit').should('have.text', 'Deposit')
    }

    validateForecastRevenue() {
        cy.readFile('cypress/fixtures/relationshipincomeData.json')
            .then((data) =>{
                this.forecastRevenue().first().invoke('text').then((text) => {
                    expect(text).to.include(data.creditrevenue)
                })
        
                this.forecastDepositRevenue().invoke('text').then((text) => {
                    expect(text).to.include(data.depositrevenue)
                })


            })

    }

    validateTotalForecastRevenue() {
        cy.readFile('cypress/fixtures/relationshipincomeData.json')
        .then((data) =>{ 
            this.totalForecastRevenue().invoke('text').then((text) => {
                expect(text).to.include(data.totalrevenue)
            })
        })
    }

    writeListOfProducts() {
        this.existingProducts().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.totalproducts = text
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    validateListOfProducts(totalproducts) {
        this.existingProducts().invoke('text').then((text) => {
            expect(text).to.include(totalproducts)
        })
    }

    writeCommercialLendingProducts() {
        this.categories().contains('Commercial Lending').click()
        cy.checkSpinner()
        this.existingProducts().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.CommercialLendingProducts = text
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    validateCommercialLendingProducts(CommercialLendingProducts) {
        this.existingProducts().invoke('text').then((text) => {
            expect(text).to.include(CommercialLendingProducts)
        })
    }

    writeDepositProducts() {
        this.categories().contains('Commercial Lending').click()
        cy.checkSpinner()
        this.categories().contains('Deposit').click()
        cy.checkSpinner()
        this.existingProducts().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.DepositProducts = text
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    validateDepositProducts(DepositProducts) {
        this.existingProducts().invoke('text').then((text) => {
            expect(text).to.include(DepositProducts)
        })
    }

    validateListOfClients(clientlength) {
        this.tab().contains('Clients').click()
        this.pageSelect().select('50  per page')
        this.clientList().should('have.length', clientlength)
    }

    validateForecastTotalRevenueEqualTitleTotalRevenue(totalrevenue) {
        cy.readFile('cypress/fixtures/relationshipincomeData.json')
            .then((data) => {
                this.totalForecastRevenue().invoke('text').then((text) => {
                    expect(text).to.include(data.totalrevenue)
                })
        
                this.titles().contains('Total').next().invoke('text').then((text) => {
                    expect(text).to.include(data.totalrevenue)
                })

            })


    }

    convertTextToThousand(text) {
        let removeDollerSign = text.replace("$",'')
        let removeComma = removeDollerSign.replace(",","")
        let number = parseFloat(removeComma)/1000
        let convertedNumber = '$' + number.toFixed()+ ' K'
        return convertedNumber
    }

    writeYTDTotalHistoricalRevenue() {
        
        this.ytdTotal().last().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDtotalrevenue = this.convertTextToThousand(text)
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })

        this.ytdTotal().next().last().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDtotalRoe = text.replace(/\s+/g, '')
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    writeYTDTotalHistoricalROE() {
        this.ytdTotal().next().last().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDtotalRoe = text.replace(/\s+/g, '')
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }


    writeYTDCreditHistoricalRevenue() {
        this.categories().contains('Commercial Lending').parent().next().next().next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDCreditRevenue = this.convertTextToThousand(text)
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    writeYTDDepositHistoricalRevenue() {
        this.categories().contains('Deposit').parent().next().next().next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDDepositRevenue = this.convertTextToThousand(text)
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    writeYTDServiceHistoricalRevenue() {
        this.categories().contains('Transaction Banking').parent().next().next().next().invoke('text').then((text) => {
            cy.readFile('cypress/fixtures/relationshipincomeData.json').then((obj) => {
                obj.YTDServiceRevenue = this.convertTextToThousand(text)
                cy.writeFile('cypress/fixtures/relationshipincomeData.json', obj)
            })
        })
    }

    clickRelationshipIncomeTab() {
        this.relationshipIncomeTab().click()
        cy.checkSpinner()
    }

    clickPlusFutureCell() {
        this.plusFutureCrossSellBtn().should('be.visible')
        this.plusFutureCrossSellBtn().click({ force: true })
    }

    addFutureCell() {
        this.potentialRevenue().type("4000")
        this.averageBalance().type("2000")
        this.creditRwa().type("1000")
        this.comments().type("Future cell added")
        this.revenue().click({ force: true })
        cy.checkSpinner()
        this.okBtn().click()
    }

    clickApplyChanges() {
      
        cy.checkSpinner()
        this.applyChanges().click()
        cy.checkSpinner()
    }

    clickModalApplyChanges(){
        this.applyChangeBtn().click()
        ApprovalPage.windowBtn().click()
        cy.checkSpinner()
    }

    clickFutureCrossSellTab() {
        this.futureCrossSellTab().click()
    }

    clickEditBtn() {
        this.editBtn().should('be.visible')
        this.editBtn().click()
    }

    clickDeleteBtn() {
        this.deleteBtn().click()
    }

    editFutureCell() {
        this.potentialRevenue().type("5000")
        this.averageBalance().type("4000")
        this.creditRwa().type("3000")
        this.comments().type("Future cell edited")
        this.revenue().click({ force: true })
        cy.checkSpinner()
        this.okBtn().click()
    }

    deleteFutureCell() {
        this.deleteBtn().click()
    }

    confirmDeleteApplyChanges() {
        this.yesBtn().click()
        this.applyChanges().click()
    }

    

    writeRevenueSvaRoeFromRelationshipPage() {
        this.relationshipValues().find('h4').contains("Relationship").nextAll().
            children().contains('Revenue').next().invoke('text').then((text) => {
                cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', { revenue: text })
            })

        this.relationshipValues().find('h4').contains("Relationship").nextAll().
            children().contains('SVA').next().invoke('text').then((text) => {
                cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json').then((obj) => {
                    obj.sva = text
                    cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', obj)
                })
            })

        this.relationshipValues().find('h4').contains("Relationship").nextAll().
            children().contains('ROE').next().invoke('text').then((text) => {
                cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json').then((obj) => {
                    obj.roe = text
                    cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', obj)
                })
            })


        //
        this.relationshipValues().find('h4').contains("Relationship + Deal").nextAll().
            children().contains('Revenue').next().invoke('text').then((text) => {
                cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json').then((obj) => {
                    obj.revenueWithDeal = text
                    cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', obj)
                })
            })

        this.relationshipValues().find('h4').contains("Relationship + Deal").nextAll().
            children().contains('SVA').next().invoke('text').then((text) => {
                cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json').then((obj) => {
                    obj.svaWithDeal = text
                    cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', obj)
                })
            })

        this.relationshipValues().find('h4').contains("Relationship + Deal").nextAll().
            children().contains('ROE').next().invoke('text').then((text) => {
                cy.readFile('cypress/fixtures/pricingRevenueRoeSva.json').then((obj) => {
                    obj.roeWithDeal = text
                    cy.writeFile('cypress/fixtures/pricingRevenueRoeSva.json', obj)
                })
            })

    }


    //Imported Product Data Verification

    validateValue(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate]
        cy.log(fieldtovalidate + ' Field json value is  ' + value)
        this.fieldElementValue(fieldtovalidate).invoke('prop', 'value').then(data => {
            expect(data).to.eq(value)
        })
    }

    validateTextValue(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate]
        cy.log(fieldtovalidate + ' Field json value is  ' + value)
        this.fieldElementValue(fieldtovalidate).scrollIntoView().should('have.text', value)

    }


    validateDdlValue(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate]
        cy.log('value is ' + value)
        this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text', value)
    }



    validateDateField(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate]
        cy.log(value)

        this.dateFieldName(fieldtovalidate)
            .next()
            .find('.clr-input')
            .invoke('prop', 'value').then(data => {
                expect(data).to.eq(value)
            })
    }

    validateFeeName(product, fieldtovalidate, data) {
        let fieldName = data[product][fieldtovalidate].title
        let row = data[product][fieldtovalidate].row
        cy.log("Fee Name = " + fieldName)
        cy.log('Fee row = ', row)
        this.feeNameLabel()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.text', fieldName)
    }

    validatePaymentFreq(product, fieldtovalidate, data) {
        let feeType = data[product][fieldtovalidate].freqValue
        let row = data[product][fieldtovalidate].row

        cy.log('Payment Frequency = ', feeType)
        cy.log('Fee row = ', row)

        //Need to change. just a quick first to complete the release
        cy.get('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(1)
            .find('option:selected').should('include.text', feeType)


    }

    validateStdFee(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate].stdValue
        let row = data[product][fieldtovalidate].row

        cy.log('Standard Fee = ', value)
        cy.log('Fee row = ', row)

        this.stdFeeInput()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.value', value)
    }

    validateProposedFee(product, fieldtovalidate, data) {
        let value = data[product][fieldtovalidate].proposedValue
        let row = data[product][fieldtovalidate].row

        cy.log('Proposed Fee = ', value)
        cy.log('Fee row = ', row)

        this.proposedFeeInput()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.value', value)
    }

    validateFeeIfWaived(product, fieldtovalidate, data) {
        let isWaived = data[product][fieldtovalidate].isWaived
        let row = data[product][fieldtovalidate].row

        cy.log("Is the field isWaived? " + isWaived)
        cy.log('Fee row = ', row)

        if (isWaived == "Y") {
            this.isWaiveChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.checked')

        } else {

            this.isWaiveChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.checked')
        }
    }

    validateFeeIfAmortised(product, fieldtovalidate, data, isDisabled) {
        let isAmortised = data[product][fieldtovalidate].isAmortised
        let row = data[product][fieldtovalidate].row

        cy.log("Is the field isAmortised? " + isAmortised)
        cy.log('Fee row = ', row)

        if (isAmortised == "Y") {
            this.isAmortisedChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.checked')
        } else {

            this.isAmortisedChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.checked')
        }
    }

    clickModifyIcon(){
        this.modifyIcon().first().click()
    }
   
    clickRefinance(){
        this.refinanceBtn()
            .first()
            .click()
    }



    verifyRevertIcon(product){
        cy.contains(product.trim()).nextAll().find('cds-icon').invoke('attr', 'title').then((title) => {
            expect(title).to.equal('Revert')
        })
    }
   


}
export default RelationshipIncomePage = new RelationshipIncomePage