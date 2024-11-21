import dayjs from "dayjs"
class ApprovalPage {
   approvalTab() { return cy.get('[title="Approval"]') }
   actionBtn() { return cy.get('.ng-trigger-defaultButton') }
   pricingTab() { return cy.get('[title="Pricing"]') }
   actionBtn() { return cy.get('.ng-trigger-defaultButton') }
   windowNotification() { return cy.get('.modal-title') }
   windowBtn() { return cy.get('.modal-footer > .btn-primary') }
   roleIcon() { return cy.get('.roleInfo > .dropdown') }
   approverDropdown() { return cy.get('.dropdown-menu') }
   doneBtn() { return cy.get('.approver-dropdown-footer > .btn') }
   draft() { return cy.get('#draft') }
   npw() { return cy.get('#npw') }
   indicative() { return cy.get('#indicative') }
   pendingApproval() { return cy.get('#pendingapproval') }
   approved() { return cy.get('#approved') }
   booked() { return cy.get('#booked') }
   comments() { return cy.get('.fr-wrapper.show-placeholder') }
   spinner() { return cy.get('.spinner') } // Loading Spinner
   currentStatus() { return cy.get('.current > .status') }
   icon() { return cy.get('span.badge.badge-purple') }
   actionHistoryRow() { return cy.get('tbody > tr') }
   successNotification() { return cy.get('.success-title') }
   selfApprove() { return cy.get('.roleInfo') }
   alertText() { return cy.get('.alert-text') }
   closeAlertIcon() { return cy.get('.close > cds-icon') }
   actionDropdown() { return cy.get('.dropdown > .btn > .ng-trigger') }
   calcBtn() { return cy.contains(' Calc') }
   npwBtn() { return cy.contains(' Npw ') }
   typeComment() { return cy.get('[contenteditable="true"]') }
   clickNpw() { return cy.get('.modal-footer > .btn-primary') }
   bookBtn() { return cy.get('div.ng-star-inserted > .btn-primary') }
   outerProductId() { return cy.get("td[class*='ng-star-inserted']>input") }
   nextPage() { return cy.get("li[class='ng-star-inserted']") }
   productIdBook() { return cy.get('button.btn.btn-sm.btn-primary.ng-tns-c45-21.ng-star-inserted') }
   dealActions() {return cy.get("button[role='menuitem']")}
   declineButton() {return cy.get("button[class*='btn btn-sm btn-primary']")}
   dropDownBtn()  {return cy.get('.dropdown > .btn > .ng-trigger')}
   redStatus() { return cy.get('span.status.red')}
   declined() { return cy.get('#declined')}
   checkIcon() { return cy.get('cds-icon.ng-star-inserted ') }
   actionHistoryColumnsHeadings() { return cy.get('thead > tr > ')}
   introductionComments() { return cy.get('div.fr-element.fr-view.fr-element-scroll-visible')}
   relationshipSummary() { return cy.get('#Deal\\ Summary .btn-icon cds-icon')}
   chooseDate() { return cy.get('[title="Choose date"]')}
   todayDate() { return cy.get('.day-btn.is-today')}
   calendarDate(date) { return cy.get(`[aria-label="${date}"]`)}
   assesssmentType() { return cy.get('#assessmentType')}
   probabilityOfSuccess() { return cy.get('#probabilityOfSuccess')}
   commentaryActionHistoryTab() { return  cy.get('.noRouting')}
   windowNotif() { return cy.get('.modal-body > p.ng-star-inserted') }
   npwStatusReason() { return cy.get('#statusReason')}
   esgCheck() {return cy.get('div.esg-link-group')}



   //Add commentary details is required before sending the deal to indicative
   addCommentaryDetails() {

      let tomorrow = dayjs().add(3, 'day').format('M/D/YYYY') // Need to select tomorrow's date to avoid error
      
      cy.log("tomorrow" + tomorrow)
      cy.wait(2000)
      this.introductionComments().eq(0).type('{selectall}test')
         .then(()=>{   //Included .then command to make sure that the code will be executed one after the other
            this.relationshipSummary().click()
         })
         .then(()=>{
            this.chooseDate().click()
            cy.wait(500)
            .then(()=>{
               this.calendarDate(tomorrow).click()
               cy.wait(500)
               .then(()=>{
                  // this.assesssmentType().find('option').contains('2: deal').click()
                  this.assesssmentType().select('2: deal',{ force: true })
                  cy.wait(500)
                  .then(()=>{
                     this.probabilityOfSuccess().click().type('40')
                     cy.wait(500)
                     .then(()=>{
                        this.actionBtn().contains('Save').click()
                     })
                  })
               })
            })
         })


         
      cy.checkSpinner()
   }

   clicksOnActionHistoryTab() {
      this.actionHistoryTab().click()
   }
   
   clickOnDropDownBtn() {
      this.dropDownBtn().click({force:true})
   }

   validatingStatus(){
      this.redStatus().should('be.visible')
   }

   ValidateDeclinedStatus(){
      this.declined().should('be.visible')
   }
   
   declineDeal(comments){
      this.dealActions().contains("Decline").click({force:true})
      this.enterStatusComments(comments)
      this.declineButton().click()
      cy.checkSpinner()
  }

   validateApprovedStatus() {
      this.approved().should('be.visible')
   }

   clickOnApproveBtn() {
      this.actionBtn().contains('Approve').click()
   }

   clickOnDeclineBtn() {
      this.actionDropdown().click()
   }

   validatingCheckIcon() {
      this.checkIcon().eq(10).should('be.visible')
   }
   
   clickOnBookBtn() {
      this.bookBtn().click()
      cy.checkSpinner()
   }

   giveOuterProductId() {
      this.outerProductId().then(ProductId => {
         cy.log("fields " + ProductId.length)
         for (let i = 0; i < ProductId.length; i++) {
            var required_num = Math.floor((Math.random() * 89999 + 100000))
            this.outerProductId().eq(i).type('AB-' + required_num)
         }
      })

      cy.get("body").then($body => {
         if ($body.find("li[class='ng-star-inserted']").length > 1) {
            this.nextPage().then(pages => {
               for (let j = 0; j < pages.length; j++) {
                  this.outerProductId().then(ProductId => {
                     cy.log("fields " + ProductId.length)
                     for (let i = 0; i < ProductId.length; i++) {
                        var required_num = Math.floor((Math.random() * 89999 + 100000))
                        this.outerProductId().eq(i).type('AB-' + required_num)
                     }
                  })
               }
            })
         }
      });

      this.bookBtn().eq(1).click()
   }


   clickOnConfirmBook() {
      this.bookBtn().eq(1).click()
   }


   verifyPricingTab() {
      this.pricingTab()
         .should('have.class', 'active')

   }

   validateDraftStatus() {
      this.draft().should('have.class', 'current')
   }

   validateIndicativeStatus() {
      this.indicative().should('have.class', 'current')
   }

   congratulationPopUp() {
      this.alertText().should('include.text', `Based on the profile of the proposed Deal, you have the authority to self-approve the pricing!`)
   }

   validateSelfApprove() {
      this.selfApprove().should('be.visible')
   }

   validateNpwStatus() {
      this.npw().should('have.class', 'current')
   }

   validateWithdrawStatus() {
      this.npw().should('have.class', 'current')
   }

   navigateToApproval() {
      cy.checkSpinner()
      this.approvalTab().click()
         .then(() =>
            this.approvalTab()
               .should('have.class', 'active')
         )
   }

   navigateToPricing() {
      this.pricingTab()
         .click()
         .then(() =>
            this.verifyPricingTab()

         )
   }

   sendDealToIndicative() {
      this.actionBtn().contains('Indicative').click()
   }

   sendDealToWithdraw() {
      this.actionBtn().contains('Withdraw').click()
   }

   approverSendDealToAmend(comments) {
      this.actionDropdown().click()
      this.dealActions().contains('Amend').click({force:true})
      this.enterStatusComments(comments)
      this.windowBtn().contains('Amend').click()
      cy.checkSpinner()
      
      
   }

   approverApproveDeal(comments) {
      cy.checkSpinner()
      this.enterStatusComments(comments)
      this.windowBtn().contains('Approve').click()
      cy.checkSpinner()
   }

   approveDirectly(comments) {
      cy.checkSpinner()
      this.enterStatusComments(comments)
      this.actionBtn().contains('Approve').click()
      cy.checkSpinner()
   }

   confirmMoveDraftToIndicative() {
      this.windowNotification().should('have.text', ' Move Deal from Draft to Indicative? ')
      this.windowBtn().contains('Move').click()
      cy.checkSpinner()
   }

   validatingAlert(alertText) {
      this.alertText()
         .should('be.visible')
         .and('have.text', alertText)
   }

   closingAlertPopup() {
      this.closeAlertIcon().click()
   }

   validateSuccessMessage() {
      this.successNotification().should('be.visible')
   }

   validateActionHistory(comments) {
      this.commentaryActionHistoryTab().contains('Action History').click()
      this.actionHistoryRow()
         .first() // select the latest update
         .should('have.contain.text', comments)
   }

   validateActionHistorySelfApprove(comments) {
      this.commentaryActionHistoryTab().contains('Action History').click()
      // this.actionHistoryTab().click()
      this.actionHistoryRow()
         .eq(1) // select second row 
         .should('have.contain.text', comments)
   }

   selectL1Approver(L1Approver) {
      this.roleIcon()
         .first()
         .click()
      this.approverDropdown()
         .contains(L1Approver)
         .click({ force: true })
      this.doneBtn()
         .first()
         .click({ force: true })
   }

   selectL2Approver(L2Approver) {
      this.roleIcon()
         .last()
         .click()
      this.approverDropdown().eq(1)
         .contains(L2Approver)
         .click({ force: true })
      this.doneBtn()
         .last()
         .click({ force: true })
   }


   sendToApproval() {
      this.actionBtn().contains('Submit').click()
      cy.checkSpinner()
   }


   verifyDealL1Status() {
      this.currentStatus().eq(0).should('be.visible') // Blue Circle status
   }

   verifyHourglassIcon() {
      this.icon().should('be.visible', 'icon')
   }


   selectCalc() {
      this.alertText().should('not.exist')
      this.actionDropdown().click()
      this.calcBtn().click({force:true});
   }

   enterStatusComments(comment) {
      
      this.comments()
         .eq(0)
         .type(comment)
   }


   npwDeal() {
      this.actionDropdown().click()
      this.npwBtn().click({force:true})
      
   }
   npwReason(reason){
      this.npwStatusReason().select(reason)
   }

   enternpwComments(comments)
   {
      this.enterStatusComments(comments)
      this.windowBtn().contains('Npw').click()
      cy.checkSpinner() // Wait until processing is complete

   }


   modifyDeal(comments) {
      this.actionBtn().contains('Modify').click()
      this.enterStatusComments(comments)
      this.windowBtn().contains('Modify').click()
      cy.checkSpinner() // Wait until processing is complete
   }

   withdrawDeal(comments) {
      this.actionBtn().contains('Withdraw').click()
      this.enterStatusComments(comments)
      this.windowBtn().contains('Withdraw').click()
      cy.checkSpinner() // Wait until processing is complete
   }

   confirmToMoveDraftToIndicative() {
      this.windowNotif().should('have.text', ' Deal status will change from Draft to Indicative. Do you want to proceed?')
      this.windowBtn().contains('Move').click()
      cy.checkSpinner()
   }

   validatingIndicative() {
      this.indicative().should('be.visible')
   }

   verifyApproverActionSelection(){
      this.actionBtn().should('contain', 'Approve')
      this.actionDropdown().click()
      this.dealActions().should('contain','Decline')
      this.dealActions().should('contain','Amend')
   }
   verifyApproverActionOptions(){
      this.actionBtn().should('contain', 'Approve')
      this.actionDropdown().click()
      this.dealActions().should('contain','Decline')  
   }



   verifyColumns(columns) {
		let i = 0
      this.commentaryActionHistoryTab().contains('Action History').click()
		while (i < columns.length ) { //Iterate on the column heading provided in the test files
			this.actionHistoryColumnsHeadings()
				.eq(i)
				.should('have.text', columns[i])
			i++
		}
	}

   verifyEsgCheckIcon(){
      this.esgCheck().should('be.visible')

  }
}

export default ApprovalPage = new ApprovalPage