import AccessPage from "./AccessPage"
class DealAccessPage{

    dealAccessTab() { return cy.get("a[title='Deal Access']")}


    
    clickDealAccessTab(){
        this.dealAccessTab().click()
    }

}

export default DealAccessPage = new DealAccessPage()