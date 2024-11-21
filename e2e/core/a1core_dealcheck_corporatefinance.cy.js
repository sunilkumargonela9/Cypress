import ApiPage from '../../pageObjects/ApiPage';
import TopMenuPage from "../../pageObjects/TopMenuPage"
import dayjs from 'dayjs'


const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const dealName = "DealCheck_CorporateFinance" + dateNow
const dealCode = dateNow


const control_file_path = "cypress/fixtures/global_qa/controlfile_corporatefinance.json"
const payload_path = "cypress/fixtures/global_qa/payload_corporatefinance.json"
const response_file_path = "cypress/fixtures/actual_corporatefinance.json"



describe("Create deal with asset finance product and verify with control file", () => {
    it('Create deal', () => {
        ApiPage.updateDealCreatePayload(payload_path, dealCode, dealName)
        ApiPage.createDealWithApi(payload_path, dealCode)

    })

    it('Verify the the deal is created', () => {
        cy.login(username, password)
        TopMenuPage.searchValue(dealName)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(dealName)
        TopMenuPage.verifySearch(dealName)
    });
   
    it("get deal details and save the response", () => {
        cy.apiLogin()
        ApiPage.getDealResults(response_file_path)
    })

    it('Clean Test Data', () => {
        ApiPage.cleanJsonData(control_file_path)
        ApiPage.cleanJsonData(response_file_path)
    });

    it("Compare deal response data with control file data and verify", () => {
         ApiPage.validateJsonData(control_file_path, response_file_path)
    
    })


}) 