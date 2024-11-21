import PendingApprovalPage from '../../pageObjects/PendingApprovalPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'
import LeftNavigation from '../../pageObjects/LeftNavigation'

const username = Cypress.env('username')
const password = Cypress.env('password')
const approverL1 = Cypress.env('approverL1')
const pendingDealColumns = Cypress.env('pendingDealColumns')
const actionHistoryColumns = Cypress.env('actionHistoryColumns')
const dealName = dealData.awfPendingDeal // select deal for approval


before(() => {
    cy.login(approverL1, password)
});

describe('User should be able to navigate to Pending My Approval list page after clicking "Pending My Approval" button', () => {

    it('User should be able to navigate to pending my approval list ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openPendingApprovalList()
        PendingApprovalPage.verifyPageTitle()
    });

    it('Column should contain  Deal Name, Deal Id, Relationship Name, Submitter Name, Date Submitted and Approver Name', () => {
        PendingApprovalPage.verifyColumns(pendingDealColumns)

    });

})

describe('User should be able to navigate to deal details', () => {
    it('User should be able to navigate to pricing page', () => {
        PendingApprovalPage.selectDealForApproval(dealName)
        ApprovalPage.verifyPricingTab()
        ApprovalPage.navigateToApproval()
        
    });
});

describe('Approver Action Selection', () => {
    it('User should be able to either Approve or Decline', () => {
        ApprovalPage.verifyApproverActionOptions()
    });
});

describe('User should be able to see the history of the deal', () => {
    it('Action history should contains the following: User who perform the transation, Action, Date, Any Comments', () => {
        ApprovalPage.verifyColumns(actionHistoryColumns)

    });
});



