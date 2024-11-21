import ClientWizardPage from "./ClientWizardPage"
import ProductPage from "./ProductPage"
import ApprovalPage from "./ApprovalPage"

class ProspectPage {
    expandSideBar() { return cy.get('.nav-trigger-icon') }
    fieldName(fieldName) { return cy.get(`#${fieldName}`) }
    relationshipName() { return cy.get('.breadcrumb-active > span') }

    // Check entered/selected value
    verifyValue(fieldName, value) {
        this.fieldName(fieldName).invoke('val').then(val => {
            expect(val).to.contain(value)
        })
    }

    enterFieldValue(fieldName, value) {
        cy.wait(1000)
        if (value != 'Not Applicable') {
            this.fieldName(fieldName).clear()
                .then(() => {
                    cy.wait(1000)
                    this.fieldName(fieldName).type(value)
                        .then(() => {
                            cy.wait(1000)
                            
                            this.verifyValue(fieldName, value)
                        })
                })

        }
    }

    selectDropdown(fieldName, value) {
        cy.wait(1000)
        if (value != 'Not Applicable') {
            this.fieldName(fieldName).select(value)
                .then(() => {
                    this.verifyValue(fieldName, value)
                })

        }
    }

    getBytext(text) {
        return cy.contains(text)
    }

    populateRequiredFields(testEnv) {

        this.enterFieldValue('relationshipname', Cypress.env('relationshipname'))
        cy.focused().tab()

        switch (testEnv) {
            case 'cba': {
                this.selectDropdown('relationshipdivision', Cypress.env('relationshipdivision'))
                this.selectDropdown('relationshipbusinessSegment', Cypress.env('relationshipbusinessSegment'))
                this.selectDropdown('relationshipsegment', Cypress.env('relationshipsegment'))
                this.selectDropdown('relationshipsubSegment', Cypress.env('relationshipsubSegment'))
                break
            }

            case 'cba_sandbox': {
                this.selectDropdown('relationshipdivision', Cypress.env('relationshipdivision'))
                this.selectDropdown('relationshipbusinessSegment', Cypress.env('relationshipbusinessSegment'))
                this.selectDropdown('relationshipsegment', Cypress.env('relationshipsegment'))
                this.selectDropdown('relationshipsubSegment', Cypress.env('relationshipsubSegment'))
                break
            }

            case 'asb': {
                this.enterFieldValue('relationshipouterCustomerId', Cypress.env('relationshipouterCustomerId'))
                this.selectDropdown('relationshipdivision', Cypress.env('relationshipdivision'))
                this.selectDropdown('relationshipbusinessSegment', Cypress.env('relationshipbusinessSegment'))
                this.selectDropdown('relationshipbusinessUnit', Cypress.env('relationshipbusinessUnit'))
                this.selectDropdown('relationshipbranch', Cypress.env('relationshipbranch'))
                this.enterFieldValue('relationshiprelationshipExposure', Cypress.env('relationshiprelationshipExposure'))
                this.enterFieldValue('relationshipdescription', Cypress.env('relationshipdescription'))
                this.enterFieldValue('relationshipcustomerGroupTurnover', Cypress.env('relationshipcustomerGroupTurnover'))
                break
            }
            case 'globalqa': {
                this.selectDropdown('relationshipdivision', Cypress.env('relationshipdivision'))
                this.selectDropdown('relationshipbusinessSegment', Cypress.env('relationshipbusinessSegment'))
                this.selectDropdown('relationshipindustryCategory', Cypress.env('relationshipindustryCategory'))
                this.enterFieldValue('relationshipouterCustomerId', Cypress.env('relationshipouterCustomerId'))
                this.selectDropdown('relationshipindustryCode', Cypress.env('relationshipindustryCode'))
                this.selectDropdown('relationshipcreditRatingCode', Cypress.env('relationshipcreditRatingCode'))
                this.selectDropdown('relationshipbookingStateLocation', Cypress.env('relationshipbookingStateLocation'))
                this.selectDropdown('relationshipcapitalClassCode', Cypress.env('relationshipcapitalClassCode'))
                this.enterFieldValue('relationshipprimaryContact', Cypress.env('relationshipprimaryContact'))
                this.selectDropdown('relationshipbusinessUnit', Cypress.env('relationshipbusinessUnit'))
                this.enterFieldValue('relationshiprelationshipExposure', Cypress.env('relationshiprelationshipExposure'))
                this.enterFieldValue('relationshipdescription', Cypress.env('relationshipdescription'))
                break
            }
            case 'fitbqa': {
                this.enterFieldValue('relationshipouterCustomerId', Cypress.env('relationshipouterCustomerId'))
                this.selectDropdown('relationshiploB', Cypress.env('relationshiploB'))
                break
            }
            case 'mqgqa': {
                this.selectDropdown('relationshipclientAnnualTurnover', Cypress.env('relationshipclientAnnualTurnover'))
                this.selectDropdown('relationshipbookingStateLocation', Cypress.env('relationshipbookingStateLocation'))
                this.enterFieldValue('relationshipotherBfsIncome', Cypress.env('relationshipotherBfsIncome'))
                this.selectDropdown('relationshipbusinessSegment', Cypress.env('relationshipbusinessSegment'))
                this.selectDropdown('relationshipbusinessUnit', Cypress.env('relationshipbusinessUnit'))
                this.selectDropdown('relationshipindustryCategory', Cypress.env('relationshipindustryCategory'))
                this.selectDropdown('relationshipindustryCode', Cypress.env('relationshipindustryCode'))
                this.selectDropdown('relationshipdivision', Cypress.env('relationshipdivision'))
                this.enterFieldValue('relationshiptotalDepositBalances', Cypress.env('relationshiptotalDepositBalances'))
                break
            }
            case 'wnzlqa': {
                this.selectDropdown('relationshipcurrentChannel', Cypress.env('relationshipcurrentChannel'))
                this.selectDropdown('relationshipcurrentBusinessUnit', Cypress.env('relationshipcurrentBusinessUnit'))
                this.selectDropdown('relationshipmainBankInd', Cypress.env('relationshipmainBankInd'))
                break
            }
            default:
                {
                    break
                }
        }

        cy.focused().tab()
        this.getBytext('Save').click()
        cy.checkSpinner()
    }

    verifyRelationshipIsCreated() {
        this.relationshipName().should('have.text', Cypress.env('relationshipname'));
    }

    editRelationshipName(name) {
        this.enterFieldValue('relationshipname', name)
        cy.focused().tab()
        this.getBytext('Save').click()
    }

    editRelationshipCustId(id) {
        this.enterFieldValue('relationshipouterCustomerId', id)
        cy.focused().tab()
        this.getBytext('Save').click()
    }

    clickPopUpOk() {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.find("div[class*='modal-footer']").length > 0) {
                ApprovalPage.windowBtn().click()
            } else {
                cy.log('Popup is not displayed')
            }
        })
    }

    validateDealOwnerDefaultValue(fieldtovalidate, data) {
        let defaultValue = data.fieldsData[fieldtovalidate].defaultValue
        cy.wait(1000)
        ClientWizardPage.owner().invoke('val').then((value) => {
            expect(value).to.equal(defaultValue)
        })
    }

    verifyFieldDefaultValue(fieldtovalidate, name){
        ProductPage.fieldElementValue(fieldtovalidate).invoke('prop', 'value').then(value => {
            expect(value).to.eq(name)
        })
    }

}

export default ProspectPage = new ProspectPage





































