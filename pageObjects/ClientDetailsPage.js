
class ClientDetailsPage 
{
   owner() {return cy.get("input[id*='clr-form-control']")}
   fieldElementValue(field)  { return cy.get(`*[id*="${field}"]`)}
   drpDwnfieldElement(field)  { return cy.get(`select[id="${field}"]`)}
   detailsTab()  { return cy.get(`[title= "Details"]`)}
   

   navigateToDetailsPage() {
      this.detailsTab().click()
   }
   
   validateRelationshipOwnerDefaultValue(fieldtovalidate, data){
      let defaultValue = data.client[fieldtovalidate]
    this.owner().eq(0).should('have.value',defaultValue)
   }
   
   
   validateDefaultValue(fieldtovalidate,data){
      let defaultValue = data.client[fieldtovalidate]
      this.fieldElementValue(fieldtovalidate).should('include.value',defaultValue)
   }

   validateDdlDefaultValue(fieldtovalidate,data){
      let defaultValue =  data.client[fieldtovalidate]
    this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text',defaultValue)
   }
   

}

export default ClientDetailsPage = new ClientDetailsPage