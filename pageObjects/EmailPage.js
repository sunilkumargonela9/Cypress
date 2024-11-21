import LoginPage from "./LoginPage"

let serverId = 'kck4ifyv'
let serverDomain = '@kck4ifyv.mailosaur.net'
let emailAddress = 'lorenzo.kck4ifyv@mailosaur.net'
let emailData = 'cypress/fixtures/emailData.json'

class EmailPage  {    

    deleteAllMessage() {
        cy.mailosaurDeleteAllMessages(serverId)
    }

    clearEmailData() {
        cy.writeFile('cypress/fixtures/emailData.json','')
    }

    getEmailData(approver) {
        cy.wait(5000) // Set time for the email to be sent to the server
        let emailAddress = approver + `.kck4ifyv@mailosaur.net`
        cy.log(emailAddress)  
        cy.mailosaurGetMessage(serverId, 
            {sentTo: emailAddress},
            // {receivedAfter: new Date('2022-10-10T00:00:00Z')},
        )
        .then(email => {
            cy.writeFile('cypress/fixtures/emailData.json',email)
            cy.log('emaildata')
        })
    }

    getEmailDataById(messageId) {
        cy.mailosaurGetMessageById(messageId)
        .then(email => {
            cy.writeFile('cypress/fixtures/emailData.json',email)
        })
    }


    verifySubject(text){
        cy.readFile(emailData)
            .then((email)=>{
                let emailSubject = email.subject
                cy.log(emailSubject)
                expect(emailSubject).to.contains(text)
            })
    }        


    checkDealDetails(username, password){
        cy.readFile(emailData)
            .then((email)=>{
                let link = email.html.links[0].href
                cy.log(link)
                cy.visit(link, {
                    onBeforeLoad: (win) => {
                    win.sessionStorage.clear()
                    }
                })
                LoginPage.userLogin(username, password)
                cy.url().should('contain',link+'/dashboard')
            })
    }

    checkAttachment(){
        cy.readFile(emailData)
            .then(email => {
                cy.writeFile('cypress/fixtures/emailData.json',email)
                let fileList = email.attachments.length
                let fileName = email.attachments[0].fileName
                cy.log(fileList)
                cy.log(fileName)
                expect(fileList).to.be.greaterThan(0)
                expect(fileName).to.contains('Summary')
            
            })
    }

    sendApproval(){
        cy.readFile(emailData)
        .then(email => {
            cy.writeFile('cypress/fixtures/emailData.json',email)
            let recipientEmail = email.from.email
            let link = email.html.links[1].href

            cy.mailosaurCreateMessage(serverId, {
                to: 'global-qa@bxtest.com.au',
                send: true,
                subject: 'DPX Deal Pricing Approved',
                text: ''
              });
        
        })
    }
        
}

export default EmailPage = new EmailPage