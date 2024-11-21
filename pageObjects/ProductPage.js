class ProductPage {
    fieldName(fieldName) { return cy.get(`#${fieldName}`) }
    relationshipName() { return cy.get("#productrelationshipName") }
    clientName() { return cy.get("#productparentEntityId") }
    pageLock() { return cy.get('#pageLock') }
    expandGen() { return cy.get('#General > .card > .card-header > .tools > .btn-icon > cds-icon') }
    revenue() { return cy.get('[id="productmarginAmount"]') }
    creditRwa() { return cy.get('[id="productcreditRWA"]') }
    fieldElementName(field) { return cy.get(`[for="${field}"]`) }
    fieldElementValue(field) { return cy.get(`*[id*="${field}"]`) }
    drpDwnfieldElement(field) { return cy.get(`select[id="${field}"]`) }
    chooseDate() { return cy.get('[title="Choose date"]') }
    todayDate() { return cy.get('button.day-btn.is-today') }
    dateField() { return cy.get('[class="clr-input ng-star-inserted"]') }
    headings() { return cy.get('.card-header') }
    pageTitle() { return cy.get('.fl-page-title-row') }
    tableHeadingsLabel() { return cy.get('th') }
    feeNameLabel() { return cy.get('.title > span') }
    paymentFreqDdl() { return cy.get('tbody select.ng-star-inserted') }
    stdFeeInput() { return cy.get('[id*="standard"]') }
    proposedFeeInput() { return cy.get('[id*="proposed"]') }
    isWaiveChkBox() { return cy.get('[id*="isWaive"]') }
    isAmortisedChkBox() { return cy.get('[id*="isAmortised"]') }
    tabledatavalue() { return cy.get('table[class="table dense cnv-form-table ng-star-inserted"] tbody tr td') }
    balanceTxt() { return cy.get('#productdepositAnticipatedBalance') }
    clientMarginTxt() { return cy.get('#productmarginRate') }
    dataTable() { return cy.get("table[class*='table cnv-table']") }
    productTermMonths() { return cy.get("#productterm") }
    interestRate() { return cy.get("#productderivedInterest") }
    balance() { return cy.get("#productdrawnAmount") }
    totalConstOfFunds() { return cy.get("#productderivedCOF") }
    limit() { return cy.get("#productlimit") }
    standardFee() { return cy.get("#fee0_standard") }
    channelNameDdl() { return cy.get("#productchannelName") }
    brokerageUpfrontInput() { return cy.get("#productbrokerage") }
    trailInput() { return cy.get("#producttrail") }
    expandGeneral() { return cy.get('#General > .card > .card-header > .tools > .btn-icon > cds-icon') }
    addTakeDown() { return cy.get('.ng-star-inserted > .btn').contains('Add Takedown') }
    originalBalance() { return cy.get('input[id="productlimit"][class^="number has-error scheduled-inputs"]') }
    takeDownProductrefRate() { return cy.get('select[id="productrefRate"][class^="has-error ng-touched"]') }
    takeDownproductresetFrequency() { return cy.get('select[id="productresetFrequency"][class^="has-error ng-touched') }
    customCashflow() { return cy.get('.btn-group > button[title="Custom Output"]') }
    pfeInput() { return cy.get('.btn-group > button[title="PFE Input"]') }
    importBtn() { return cy.get('.import-export-page-toolbar') }
    uploadFile() { return cy.get('input[type="file"]') }
    uploadBtn() { return cy.get('.modal-footer > .btn-primary') }
    startDateDtPicker() { return cy.get("cds-icon[shape='calendar']") }
    yearPickerBtn() { return cy.get("button[class*='yearpicker-trigger']") }
    years() { return cy.get("div[class='years']") }
    monthPickerBtn() { return cy.get("button[class*='monthpicker-trigger']") }
    months() { return cy.get("button[class*='calendar-btn month']") }
    days() { return cy.get("button[class='day-btn']") }
    productIndustryCode() { return cy.get("#productindustryCode") }
    productlimit() { return cy.get("#productlimit") }

    addSubProduct() { return cy.get('.ng-star-inserted > .btn').contains('Add Sub Product') }
    addSubCommLCExport() { return cy.get('.dropdown-menu > .dropdown-item').contains('Commercial LC Export') }
    productRepaymentType() { return cy.get("#productrepaymentType") }
    previousLimit() { return cy.get("#productpreviousLimit") }
    productCurrencyDdl() { return cy.get("#productcurrencyCode") }
    pricingModel() { return cy.get('#productbusinessSegment') }

    validatePaymentFreq(fieldtovalidate, data, isDisabled) {
        let feeType = data.fieldsData.feeNames[fieldtovalidate].freqDefaultValue
        let row = data.fieldsData.feeNames[fieldtovalidate].row

        cy.log('Payment Frequency = ', feeType)
        cy.log('Fee row = ', row)

        // this.paymentFreqDdl()
        //     .eq(row - 1)
        //     .find('option:selected').should('include.text', feeType)

        //Need to change. just a quick first to complete the release
        cy.get('tbody')
        .find('tr')
        .eq(row)
        .find('td')
        .eq(1)
        .find('option:selected').should('include.text', feeType)

        if (isDisabled == "disabled") {
            this.paymentFreqDdl()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.have.a.property', 'disabled')
        } else {
            this.paymentFreqDdl()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.disabled')
        }



    }

    validateStdFee(fieldtovalidate, data, isDisabled) {
        let value = data.fieldsData.feeNames[fieldtovalidate].stdDefaultValue
        let row = data.fieldsData.feeNames[fieldtovalidate].row

        cy.log('Standard Fee = ', value)
        cy.log('Fee row = ', row)

        this.stdFeeInput()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.value', value)


        if (isDisabled == "disabled") {
            this.stdFeeInput()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.disabled')
        } else {
            this.stdFeeInput()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.have.a.property', 'disabled')
        }
    }

    validateProposedFee(fieldtovalidate, data, isDisabled) {
        let value = data.fieldsData.feeNames[fieldtovalidate].proposedDefaultValue
        let row = data.fieldsData.feeNames[fieldtovalidate].row

        cy.log('Proposed Fee = ', value)
        cy.log('Fee row = ', row)

        this.proposedFeeInput()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.value', value)

        if (isDisabled == "disabled") {
            this.proposedFeeInput()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.disabled')
        } else {
            this.proposedFeeInput()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.disabled')

        }
    }

    validateFeeIfWaived(fieldtovalidate, data, isDisabled) {
        let isWaived = data.fieldsData.feeNames[fieldtovalidate].isWaived
        let row = data.fieldsData.feeNames[fieldtovalidate].row

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

        if (isDisabled == "disabled") {
            this.isWaiveChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.disabled')
        } else {
            this.isWaiveChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.disabled')
        }

    }

    validateFeeIfAmortised(fieldtovalidate, data, isDisabled) {
        let isAmortised = data.fieldsData.feeNames[fieldtovalidate].isAmortised
        let row = data.fieldsData.feeNames[fieldtovalidate].row

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


        if (isDisabled == "disabled") {
            this.isAmortisedChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('be.disabled')
        } else {
            this.isAmortisedChkBox()
                .eq(row - 1)
                .scrollIntoView()
                .should('not.be.disabled')
        }

    }


    validateTableDdlFieldOptions(fieldtovalidate, data) {
        let option = data.fieldsData.feeNames[fieldtovalidate].freqOptions
        let row = data.fieldsData.feeNames[fieldtovalidate].row

        cy.log('field to test =  ' + fieldtovalidate)
        cy.log('array = ' + option)

        option.forEach(field => {
            // this.paymentFreqDdl(fieldtovalidate)
            //     .eq(row - 1)
            //     .find('option')
            //     .should('include.text', field)

            //Below code is just a hack .. need to change after the release
            cy.get('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(1)
            .should('include.text', field)
        });


    }


    //Input mandatory field values in UI
    enterMandatoryFields(testEnv, product) {

        switch (testEnv) {
            case 'cba': {
                let testdata = Cypress.env(product)
                testdata.forEach($data => {
                    if ($data.fieldType == 1) {
                        this.enterFieldValue($data.fieldName, $data.fieldValue)
                    }
                    else {
                        this.selectDropdown($data.fieldName, $data.fieldValue)
                    }
                })
                break
            }
            case 'cba_sandbox': {
                let testdata = Cypress.env(product)
                testdata.forEach($data => {
                    if ($data.fieldType == 1) {
                        this.enterFieldValue($data.fieldName, $data.fieldValue)
                    }
                    else {
                        this.selectDropdown($data.fieldName, $data.fieldValue)
                    }
                })
                break
            }
            case 'asb': {
                let testdata = Cypress.env(product)
                testdata.forEach($data => {
                    if ($data.fieldType == 1) {
                        this.enterFieldValue($data.fieldName, $data.fieldValue)
                    }
                    else {
                        this.selectDropdown($data.fieldName, $data.fieldValue)
                    }
                })
                break
            }
            case 'globalqa': {
                this.enterFieldValue('productlimit', Cypress.env('productlimit'))
                this.enterFieldValue('productutilisationRate', Cypress.env('productutilisationRate'))
                this.selectDropdown('productrefRate', Cypress.env('productrefRate'))
                break
            }
            case 'wnzlqa': {
                this.selectDropdown('productmainBankId', Cypress.env('productmainBankId'))
                this.selectDropdown('productmCC', Cypress.env('productmCC'))
                this.enterFieldValue('productannualTurnover', Cypress.env('productannualTurnover'))
                this.selectDropdown('productmerchantChannel', Cypress.env('productmerchantChannel'))
                this.selectDropdown('productmerchantSwitch', Cypress.env('productmerchantSwitch'))
                this.selectDropdown('productblockCode', Cypress.env('productblockCode'))
                break
            }
            case 'fitbqa': {
                this.expandGenSection()
                let testdata = Cypress.env(product)
                testdata.forEach($data => {
                    if ($data.fieldType == 1) {
                        this.enterFieldValue($data.fieldName, $data.fieldValue)
                    }
                    else {
                        this.selectDropdown($data.fieldName, $data.fieldValue)
                    }
                })

                if (product == 'Non Revolving Facility' || product == 'Revolving Line of Credit') {
                    this.addTakeDown().click()
                    this.originalBalance().type("1M" + '{enter}')
                    this.pageLock().should('not.exist')
                    this.takeDownProductrefRate().select("LIBOR")
                    this.pageLock().should('not.exist')
                    this.takeDownproductresetFrequency().select("Daily/FF/Prime")
                    this.pageLock().should('not.exist')
                    cy.get('body').click(0, 0)
                } else if (product == 'Insured AR Finance' || product == 'LC Sublimit') {
                    this.addSubProduct().click()
                    this.pageLock().should('not.exist')
                    this.addSubCommLCExport().click()
                    this.originalBalance().type("1M" + '{enter}')
                } else if (product == "Operating Lease FMV" ||
                    product == "Operating Lease Split TRAC" ||
                    product == "True Lease First Amendment Leases" ||
                    product == "True Lease FMV" ||
                    product == "True Lease Split TRAC" ||
                    product == "True Lease TRAC" ||
                    product == "True Lease Unspecified") {
                    cy.log("LEASES")
                    this.uploadCustomOutput(product)
                    cy.get('body').click(0, 0)
                } else if (product == "Interest Rate Derivatives") {
                    this.uploadPFEInput(product)
                    cy.get('body').click(0, 0)
                    cy.get('body').click(0, 0)
                }
                cy.get('body').click(0, 0)
                break
            }
            case 'mqgqa': {
                this.enterFieldValue('productlimit', Cypress.env('productlimit'))
                this.selectDropdown('productlvr', Cypress.env('productlvr'))
                this.selectDropdown('productmixedSecurityOption', Cypress.env('productmixedSecurityOption'))
                break
            }
            case 'suncorp': {
                this.selectDropdown('productlgd', Cypress.env('productlgd'))
                this.enterFieldValue('productlimit', Cypress.env('productlimit'))
                this.enterFieldValue('productutilisationRate', Cypress.env('productutilisationRate'))
                this.selectDropdown('productrefRate', Cypress.env('productrefRate'))

            }
            case 'suncorp_qa': {
                this.selectDropdown('productcreditRatingCode', 1)
                this.selectDropdown('productbusinessSegment', 'Commercial')
                this.selectDropdown('productlgd', 'A')
                this.selectDropdown('productcapitalClassCode', 1)
                this.enterFieldValue('productlimit', '1000000')
                this.enterFieldValue('productutilisationRate', '80')
                this.selectDropdown('productrefRate', 1)
            }
            default:
                {
                    break
                }
        }

        this.getBytext('Save').click()
    }
    //Function call to input value in text box
    enterFieldValue(fieldName, value) {
        if (value != 'Not Applicable') {
            this.fieldName(fieldName).scrollIntoView().should('be.visible')
                .then(() => {
                    this.fieldName(fieldName).clear()
                    this.pageLock().should('not.exist')
                })
                .then(() => {
                    this.fieldName(fieldName).type(value + '{enter}')
                    this.pageLock().should('not.exist')
                })
            this.pageLock().should('not.exist')
        }
    }
    //Function call to select a value in dropdown
    selectDropdown(fieldName, value) {
        if (value != 'Not Applicable') {
            this.fieldName(fieldName).select(value)
        }
    }
    //Returns an element that contains the given text
    getBytext(text) {
        return cy.contains(text)
    }
    //Validation of dropdown inheritance values
    verifyDropdown(fieldName, value) {
        this.fieldName(fieldName).find(":selected").then($dropDown => {
            const ddText = $dropDown.text().trim()
            expect(ddText).to.equal(value)
        })
    }
    //Validate the Relationship Name
    verifyRelationshipName(testEnv) {
        this.relationshipName().should($rel => {
            const rName = $rel.val()
            expect(rName).to.equal(Cypress.env('search_relationship'))
        })
        this.verifyInheritedFields(testEnv)
    }



    //Validate the Client Name 
    verifyClientName(testEnv, clientName) {
        switch (testEnv) {
            case 'cba': {
                this.verifyDropdown('productparentEntityId', Cypress.env('search_client'))
                break
            }
            case 'cba_sandbox': {
                this.verifyDropdown('productparentEntityId', Cypress.env('search_client'))
                break
            }
            case 'globalqa': {
                this.verifyDropdown('productparentEntityId', Cypress.env('search_client'))
                this.verifyInheritedFields(testEnv)
                break
            }
            case 'fitbqa': {
                this.verifyDropdown('productparentEntityId', clientName)
                break
            }
            case 'wnzlqa': {
                this.verifyDropdown('productparentEntityId', clientName)
                break
            }
            default:
                {
                    break
                }
        }
    }
    //Function call to validate all the inherited fields
    verifyInheritedFields(testEnv) {
        switch (testEnv) {

            case 'asb': {
                this.verifyDropdown('productcreditRatingCode', Cypress.env('productcreditRatingCode'))
                this.verifyDropdown('productlgd', Cypress.env('productlgd'))
                break
            }
            case 'cba': {
                this.verifyDropdown('productpdRatingCode', Cypress.env('productpdRatingCode'))
                this.verifyDropdown('productlgd', Cypress.env('productlgd'))
                break
            }

            case 'cba_sandbox': {
                this.verifyDropdown('productpdRatingCode', Cypress.env('productpdRatingCode'))
                this.verifyDropdown('productlgd', Cypress.env('productlgd'))
                break
            }

            case 'globalqa': {
                this.verifyDropdown('productindustryCategory', Cypress.env('productindustryCategory'))
                this.verifyDropdown('productindustryCode', Cypress.env('productindustryCode'))
                this.verifyDropdown('productcreditRatingCode', Cypress.env('productcreditRatingCode'))
                break
            }
            case 'fitbqa': {
                this.verifyDropdown('productindustryEntity', Cypress.env('productindustryEntity'))
                this.verifyDropdown('productmoodysRating', Cypress.env('productmoodysRating'))
                this.verifyDropdown('productloB', Cypress.env('productloB'))
                this.verifyDropdown('productspRating', Cypress.env('productspRating'))
                this.verifyDropdown('productregion', Cypress.env('productregion'))
                this.verifyDropdown('productpdRating', Cypress.env('productpdRating'))
                break
            }
            default:
                {
                    break
                }
        }
    }
    //Validate negative scenario with error message
    verifyErrorMessage(message) {
        this.getBytext('Save').click()
        cy.contains(message).should('be.visible')
    }
    //Modify Product field values
    modifyFieldValues(refRate, creditRate, lgd) {
        let testEnv = Cypress.env('testEnv')
        switch (testEnv) {
            case 'fitbqa': {
                this.enterFieldValue('productlimit', Cypress.env(refRate))
                this.enterFieldValue('productlgdRate', Cypress.env(creditRate))
                this.enterFieldValue('productamortizationTerm', Cypress.env(lgd))
                break
            }
            case 'cba': {
                this.enterFieldValue('productlimit', Cypress.env(refRate))
                this.selectDropdown('productpdRatingCode', Cypress.env(creditRate))
                this.selectDropdown('productlgd', Cypress.env(lgd))
                break
            }
            case 'cba_sandbox': {
                this.enterFieldValue('productlimit', Cypress.env(refRate))
                this.selectDropdown('productpdRatingCode', Cypress.env(creditRate))
                this.selectDropdown('productlgd', Cypress.env(lgd))
                break
            }
            case 'asb': {
                this.enterFieldValue('productlimit', Cypress.env(refRate))
                this.selectDropdown('productlvr', Cypress.env(creditRate))
                this.selectDropdown('productlgd', Cypress.env(lgd))
                break
            }
            case 'globalqa': {
                this.selectDropdown('productrefRate', Cypress.env(refRate))
                this.selectDropdown('productcreditRatingCode', Cypress.env(creditRate))
                this.selectDropdown('productlgd', Cypress.env(lgd))
                break
            }
        }
        cy.focused().tab()
        this.getBytext('Save').click({ force: true })


    }

    validateNewDealPage() {
        this.pageTitle().contains('New Deal')
            .should('be.visible')
    }

    validateHeading(fieldtovalidate, data) {
        cy.wait(2000)
        let value = data.fieldsData.headings[fieldtovalidate]
        this.headings().contains(value).scrollIntoView().should('be.visible')
    }

    validateFieldName(fieldtovalidate, data) {
        let fieldName = data.fieldsData[fieldtovalidate].fieldName
        this.fieldElementName(fieldtovalidate).first().scrollIntoView().should('have.text', fieldName)
    }

    validateDefaultValue(fieldtovalidate, data) {
        let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
        cy.log(fieldtovalidate + ' Field json value is  ' + defaultValue)
        this.fieldElementValue(fieldtovalidate).invoke('prop', 'value').then(value => {
            expect(value).to.eq(defaultValue)
        })
    }

    validateDefaultTextValue(fieldtovalidate, data) {
        let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
        cy.log(fieldtovalidate + ' Field json value is  ' + defaultValue)
        this.fieldElementValue(fieldtovalidate).scrollIntoView().should('have.text', defaultValue)

    }

    validateFieldIsRequired(fieldtovalidate, data) {
        let isRequired = data.fieldsData[fieldtovalidate].isRequired

        cy.log("Is the field isRequired? " + isRequired)

        if (isRequired == "Y") {
            this.fieldElementName(fieldtovalidate).invoke('attr', 'class').then(text => {
                expect(text).to.include('required')
            })

        } else {

            this.fieldElementName(fieldtovalidate).invoke('attr', 'class').then(text => {
                expect(text).not.to.include('required')
            })
        }

    }

    validateFieldIsDisabled(fieldtovalidate, data) {
        let isDisabled = data.fieldsData[fieldtovalidate].isDisabled

        cy.log("Is the field disabled? " + isDisabled)

        if (isDisabled == "Y") {
            this.fieldName(fieldtovalidate).should('be.disabled')

        } else {
            this.fieldName(fieldtovalidate).should('not.be.disabled')
        }

    }

    validateDdlDefaultValue(fieldtovalidate, data) {
        let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
        cy.log('default value is ' + defaultValue)
        this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text', defaultValue)
    }

    validateClientName(fieldtovalidate, name) {
        this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text', name)
    }

    validateDdlOptions(fieldtovalidate, data) {
        let option = data.fieldsData[fieldtovalidate].options

        cy.log('field to test =  ' + fieldtovalidate)
        cy.log('array = ' + option)

        option.forEach(field => {
            this.drpDwnfieldElement(fieldtovalidate).find('option')
                .should('include.text', field)
        });
    }

    validateDdlTotalOptions(fieldtovalidate, data) {
        let lenght = data.fieldsData[fieldtovalidate].lenght

        cy.log('field to test =  ' + fieldtovalidate)
        cy.log('option lenght = ', lenght)

        this.drpDwnfieldElement(fieldtovalidate).find('option')
            .should('have.length', lenght)
    }


    validateStartDateField(dateToday) {
        cy.log(dateToday)
        this.dateField()
            .first()
            .should('have.value', dateToday)
    }

    validateStartDateFieldIsDisabled(fieldtovalidate, data) {
        let isDisabled = data.fieldsData[fieldtovalidate].isDisabled

        cy.log("Is the field disabled? " + isDisabled)

        if (isDisabled == "Y") {
            this.dateField()
                .first()
                .should('be.disabled')

        } else {

            this.dateField()
                .first()
                .should('not.be.disabled')
        }

    }


    validateMaturityDateField(maturityDate) {
        cy.log(maturityDate)

        this.dateField()
            .last()
            .should('have.value', maturityDate)
    }

    validateMaturityDateFieldIsDisabled(fieldtovalidate, data) {
        let isDisabled = data.fieldsData[fieldtovalidate].isDisabled

        cy.log("Is the field disabled? " + isDisabled)

        if (isDisabled == "Y") {
            this.dateField()
                .first()
                .should('be.disabled')

        } else {

            this.dateField()
                .first()
                .should('not.be.disabled')
        }

    }

    // Verification of Fees and Costs Table

    validateTableHeadings(fieldtovalidate, data) {
        let value = data.fieldsData.tableheadings[fieldtovalidate]
        this.tableHeadingsLabel().contains(value).scrollIntoView().should('be.visible')
    }

    validateFeeNames(fieldtovalidate, data) {
        let value = data.fieldsData.tableheadings[fieldtovalidate]
        this.tableHeadingsLabel().contains(value).scrollIntoView().should('be.visible')
    }


    validateDdl(fieldtovalidate) {
        this.fieldName(fieldtovalidate).find('option').its('length').then(value => {
            cy.log("dropdown values length is " + value)
        })
    }
    validateFeeName(fieldtovalidate, data) {
        let fieldName = data.fieldsData.feeNames[fieldtovalidate].title
        let row = data.fieldsData.feeNames[fieldtovalidate].row
        cy.log("Fee Name = " + fieldName)
        cy.log('Fee row = ', row)
        this.feeNameLabel()
            .eq(row - 1)
            .scrollIntoView()
            .should('have.text', fieldName)
    }


    validateFeeNameEstablishmentFee(data) {
        let tabledata = data.fieldsData.validateTable;
        this.tableH1Label().eq(0).should('have.text', tabledata.tableHeadings[0])
        this.tabledatavalue().eq(0).contains(tabledata.fieldName[0])

        this.tableH1Label().eq(1).should('have.text', tabledata.tableHeadings[1])
        this.tabledatavalue().eq(1).should('have.text', tabledata.defaultValue)

        this.tableH1Label().eq(2).should('have.text', tabledata.tableHeadings[2])
        this.tabledatavalue().eq(2).should('be.visible')


        this.tableH1Label().eq(3).should('have.text', tabledata.tableHeadings[3])
        this.tabledatavalue().eq(3).should('be.visible')

        this.tableH1Label().eq(4).should('have.text', tabledata.tableHeadings[4])
        this.tabledatavalue().eq(4).should('be.visible')

        this.tableH1Label().eq(5).should('have.text', tabledata.tableHeadings[5])
        this.tabledatavalue().eq(5).should('be.visible')
    }

    validateFeeNameLiqidityFee(data) {

        let tabledata = data.fieldsData.validateTable;
        this.tableH1Label().eq(0).should('have.text', tabledata.tableHeadings[0])
        this.tabledatavalue().eq(6).contains(tabledata.fieldName[1])

        this.tableH1Label().eq(1).should('have.text', tabledata.tableHeadings[1])
        this.tabledatavalue().eq(7).contains(tabledata.selectlist[0]).should('have.text', tabledata.selectlist[0])

        this.tableH1Label().eq(2).should('have.text', tabledata.tableHeadings[2])
        this.tabledatavalue().eq(8).should('be.visible')

        this.tableH1Label().eq(3).should('have.text', tabledata.tableHeadings[3])
        this.tabledatavalue().eq(9).should('be.visible')

        this.tableH1Label().eq(4).should('have.text', tabledata.tableHeadings[4])
        this.tabledatavalue().eq(10).should('be.visible')

        this.tableH1Label().eq(5).should('have.text', tabledata.tableHeadings[5])
        this.tabledatavalue().eq(11).should('be.visible')
    }

    validateFeeNameCommitmentFee(data) {
        let tabledata = data.fieldsData.validateTable;

        this.tableH1Label().eq(0).should('have.text', tabledata.tableHeadings[0])
        this.tabledatavalue().eq(12).contains(tabledata.fieldName[2])

        this.tableH1Label().eq(1).should('have.text', tabledata.tableHeadings[1])
        this.tabledatavalue().eq(13).contains(tabledata.selectlist[0]).should('have.text', tabledata.selectlist[0])

        this.tableH1Label().eq(2).should('have.text', tabledata.tableHeadings[2])
        this.tabledatavalue().eq(14).should('be.visible')

        this.tableH1Label().eq(3).should('have.text', tabledata.tableHeadings[3])
        this.tabledatavalue().eq(15).should('be.visible')

        this.tableH1Label().eq(4).should('have.text', tabledata.tableHeadings[4])
        this.tabledatavalue().eq(16).should('be.visible')

        this.tableH1Label().eq(5).should('have.text', tabledata.tableHeadings[5])
        this.tabledatavalue().eq(17).should('be.visible')

    }

    isRequired(locator, required) {
        this.fieldElementName(locator).invoke('attr', 'class').then(text => {
            expect(text).to.include(required)
        })
    }


    enterMandatoryFieldsCrossSell(revenue, creditRwa) {
        cy.checkSpinner()
        this.revenue().type(revenue).tab()
        cy.checkSpinner()
        this.creditRwa().should('be.enabled')
        this.creditRwa().click()
        this.creditRwa().type(creditRwa).tab()
        cy.checkSpinner()
    }

    clickSave() {
        this.getBytext('Save').click()
        cy.checkSpinner()
        // cy.wait(2000)
        // this.getBytext('Save').should('be.visible').click({force:true});
        // cy.checkSavedAlert()
        cy.checkSpinner()
    }

    enterMandatoryFieldsForDepositProduct(balance, clientMargin) {
        cy.checkSpinner()
        this.balanceTxt().type(balance).tab()
        cy.checkSpinner()
        this.clientMarginTxt().should('be.enabled')
        this.clientMarginTxt().type(clientMargin).tab()
        cy.checkSpinner()
    }

    fillMandatoryFields(limit, utilizationRate, referenceRate, term) {
        this.enterFieldValue('productlimit', limit)
        this.enterFieldValue('productutilisationRate', utilizationRate)
        this.selectDropdown('productrefRate', referenceRate)
        this.enterFieldValue('productterm', term)
    }

    enterStartDate(year, month, day) {
        this.startDateDtPicker().first().click()
        this.yearPickerBtn().click()
        this.years().find('button').contains(year).click()
        this.monthPickerBtn().click()
        this.months().contains(month).click()
        this.days().contains(day).click()

    }


    getValues(row) {
        cy.checkSpinner()
        let listOfResults = [];
        this.dataTable().find('td').contains(row).nextUntil('tr').each((resultItem) => {
            cy.wrap(resultItem).invoke('text').then((text) => {
                listOfResults.push(text)
                let results = JSON.stringify(listOfResults);
                cy.writeFile('cypress/fixtures/extractedValues.json', results)

            })
        })

    }

    verifyValue(row, column, data) {
        cy.checkSpinner()
        let path = "cypress/fixtures/extractedValues.json"
        cy.readFile('cypress/fixtures/global_qa/MultiYearForecastExport.json').then((values) => {
            cy.readFile(path).then((data1) => {
                let uidata1 = data1[column].replace(/\$/g, '')
                let uidata2 = uidata1.replace(/,/g, '')
                let csvData = values[row][data]
                cy.log("ui value" + data1[column])
                cy.log("csv value " + csvData)
                if (csvData == 0) {
                    expect(' - ').to.equal(uidata2)
                } else {
                    expect(csvData.toFixed()).to.equal(uidata2)
                }

            })
        })
    }

    verifyFloatValue(row, column, data) {
        cy.checkSpinner()
        let path = "cypress/fixtures/extractedValues.json"
        cy.readFile('cypress/fixtures/global_qa/MultiYearForecastExport.json').then((values) => {
            cy.readFile(path).then((data1) => {
                let uidata1 = data1[column].replace(/\%/g, '')
                let csvData = values[row][data]
                let csvData1 = csvData * 100
                cy.log("ui value " + data1[column])
                cy.log("csv value " + csvData)
                if (csvData1 == 0) {
                    expect(' - ').to.equal(uidata1)
                } else {
                    expect(csvData1.toFixed(2)).to.equal(uidata1)
                }
            })
        })
    }

    scrollToExposureHeading() {
        this.getBytext('Exposure').scrollIntoView()
    }

    clickIncomeHeading() {
        this.dataTable().find('td').contains('Income').children().click({ force: true })
    }

    clickFeesHeading() {
        this.dataTable().find('td').contains('Fees').children().click({ force: true })
    }

    clickRevenueHeading() {
        cy.checkSpinner()
        this.dataTable().find('td').contains('Revenue').children().click({ force: true })
        cy.checkSpinner()
    }

    clickNPBTHeading() {
        this.dataTable().find('td').contains('NPBT').children().click({ force: true })
        cy.checkSpinner()
    }

    clickNPATHeading() {
        this.dataTable().find('td').contains('NPAT').children().click({ force: true })
    }

    clickRegulatoryCapitalHeading() {
        this.dataTable().find('td').contains('Regulatory Capital').children().click({ force: true })
    }

    selectChannel(option) {
        cy.checkSpinner()
        this.channelNameDdl().select(option)
        cy.checkSpinner()
    }

    updateBrokerageUpfront(value) {
        this.brokerageUpfrontInput().type(value).tab()
        cy.checkSpinner()
    }

    updateTrail(value) {
        cy.wait(3000)
        cy.checkSpinner()
        this.trailInput().type(value).tab()
        cy.checkSpinner()
    }

    // addTakeDown() {
    //     this.addTakeDown().click()
    // }

    // expand the General section
    expandGenSection() {
        this.expandGeneral().then(($Expect) => {
            if ($Expect.attr("direction") == "right") {
                this.expandGeneral().click()
            }
        })
    }

    getProductIndustryCodeValue() {
        let path = 'cypress/fixtures/pricingpagedata.json'
        this.productIndustryCode().find(':selected').invoke('text').then((text) => {
            cy.readFile(path).then((data) => {
                data.pricingpage_productIndustryCode = text
                cy.writeFile(path, data)
            })
        })
    }

    getProductLimit() {
        let path = 'cypress/fixtures/pricingpagedata.json'
        this.productlimit().invoke('val').then((text) => {
            cy.readFile(path).then((data) => {
                data.pricingpage_limit = text
                cy.writeFile(path, data)
            })
        })
    }

    uploadCustomOutput(prdName) {
        cy.wait(2000)
        this.customCashflow().click({ force: true })
        this.importBtn().contains('Import').click({ force: true })
        const fixturePath = 'CustomOutputsLease.csv'
        this.uploadFile().attachFile(fixturePath)
        this.uploadBtn().click()
    }

    uploadPFEInput(prdName) {
        cy.wait(2000)
        this.pfeInput().click({ force: true })
        this.importBtn().contains('Import').click({ force: true })
        const fixturePath = 'PfeInput.csv'
        this.uploadFile().attachFile(fixturePath)
        this.uploadBtn().click()
    }

    verifyRepaymentType(type) {
        this.productRepaymentType().find(':selected').invoke('text').then((text) => {
            expect(text.trim()).to.equal(type)
        })
    }

    calculateInterest(limit, utilizationRate, term, marginOverRefRate) {
        let path = 'cypress/fixtures/calculatedInterest.text'
        this.interestRate().invoke('val').then((value) => {
            let interest_rate = value.replace('%', '')
            let interest_rate2 = parseFloat(interest_rate)
            let interest_rate3 = (interest_rate2 + marginOverRefRate) / 100
            let utilization_rate1 = utilizationRate.replace('%', '')
            let utilization_rate2 = parseFloat(utilization_rate1) / 100
            let limit1 = parseInt(limit)
            let term1 = parseInt(term)
            let interest = limit1 * utilization_rate2 * interest_rate3 / term1
            cy.log("limit: " + limit1)
            cy.log("utilization rate: " + utilization_rate2)
            cy.log("interest rate: " + interest_rate3)
            cy.log("term: " + term)
            cy.log("interest value: " + interest)
            cy.writeFile(path, Math.round(interest).toString())
        })
    }

    fillMarginOverRefRate(rate) {
        this.enterFieldValue('productmarginOverReferenceRate', rate)
    }


    fillUtilisationRate(rate) {
        this.enterFieldValue('productutilisationRate', rate)
    }


    validateCheckBoxFieldName(fieldtovalidate, data) {
        let fieldName = data.fieldsData[fieldtovalidate].fieldName
        this.fieldElementName(fieldtovalidate).first().scrollIntoView().should('have.text', fieldName)
    }

    validateFieldIsVisible(fieldtovalidate, data) {
        let isVisible = data.fieldsData[fieldtovalidate].isVisible
        if (isVisible === 'Y') {
            this.fieldElementName(fieldtovalidate).first().scrollIntoView().should('be.visible')
        } else {
            this.fieldElementName(fieldtovalidate).first().scrollIntoView().should('not.be.visible')
        }
    }

    verifyPreviousLimitFieldRule(fieldtovalidate, value) {
        this.fieldElementValue(fieldtovalidate).select(value)
        cy.wait(4000)
        this.previousLimit().should('be.visible')
    }


    verifyTimingFieldRule(fieldtovalidate, interestRateType) {
        this.fieldElementValue(interestRateType).first().find('option:selected').invoke('text').then((value) => {
            expect(value).to.equal(' Variable ')
            if (value === ' Variable ') {
                this.fieldElementValue(fieldtovalidate).first().should('be.disabled')
            }
        })

    }

    verifyUtilisationRateFieldRule(fieldtovalidate, pricingModel, product) {
        this.pricingModel().select(pricingModel)
        cy.wait(3000)
        this.fieldElementValue(fieldtovalidate).first().invoke('val').then((value) => {
            if (pricingModel === 'Commercial' && product === 'Commerical Term Loan') {
                expect(value).to.equal('90%')
            } else if (pricingModel === 'Commercial' && product === 'Overdraft') {
                expect(value).to.equal('50%')
            }
        })
    }

    verifyRepaymentFrequencyFieldRule(fieldtovalidate, interestRateType, product) {
        this.fieldElementValue(interestRateType).first().find('option:selected').invoke('text').then((value) => {
            expect(value).to.equal(' Variable ')
            if (value === ' Variable ' && product === 'Commercial Term Loan') {
                this.fieldElementValue(fieldtovalidate).first().should('not.be.disabled')
            } else if (product === 'Overdraft') {
                this.fieldElementValue(fieldtovalidate).first().should('be.disabled')
            }
        })
    }

    verifyBrokeragePercentAmountFieldRule(fieldtovalidate, limit) {
        this.fieldElementValue(limit).first().invoke('val').then((value) => {
            let limit_value = parseInt(value.replace(/[^a-zA-Z0-9]/g, ''));
            if (limit_value <= 3000000) {
                this.fieldElementValue(fieldtovalidate).first().should('not.be.disabled')
            }
        })
    }

    verifyBrokerageDollarAmountfield(fieldtovalidate, isBrokerageDollarAmount) {
        this.fieldElementValue(isBrokerageDollarAmount).check({ force: true })
        cy.wait(4000)
        this.trailInput().click()
        this.fieldElementName(fieldtovalidate).should('be.visible')
    }

    verifyTrailFieldRule(fieldtovalidate, product) {
        if (product === 'Term Loan' || 'Overdraft') {
            this.fieldElementValue(fieldtovalidate).first().should('not.be.disabled')
        }
    }

    verifyBrokerageFieldRule(fieldtovalidate, brokerageDollarAmount) {
        cy.wait(2000)
        this.fieldElementValue(fieldtovalidate).invoke('val').then((value1) => {
            this.fieldElementValue(brokerageDollarAmount).invoke('val').then((value2) => {
                cy.log("brokerage dollar amount " + value2)
                expect(value1).to.equal(value2)
            })
        })
    }

    verifyResidualAndBallonValueFieldRules(field1, field2) {
        this.productRepaymentType().select('Principal & Interest')
        cy.wait(2000)
        this.fieldElementValue(field1).should('be.visible')
        this.fieldElementValue(field2).should('be.visible')
    }


    getDealId(path) {
        cy.location()
            .then((location) => {
                let href = location.href
                let id = href.split('deal/')[1]
                cy.log("deal id is = " + id)
                cy.writeFile(path, id)
            })
    }

    verifyProductCurrency(currency) {
        this.productCurrencyDdl().find('option:selected').should('have.text', currency)
    }

    selectPricingModel(value) {
        this.pricingModel().select(value)
    }


}

export default ProductPage = new ProductPage  