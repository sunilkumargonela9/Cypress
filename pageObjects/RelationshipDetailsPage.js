
class RelationshpipDetailsPage 
{
   owner() {return cy.get("input[id*='clr-form-control']")}
   fieldElementValue(field)  { return cy.get(`*[id*="${field}"]`)}
   drpDwnfieldElement(field)  { return cy.get(`select[id="${field}"]`)}
   detailsTab()  { return cy.get(`[title= "Details"]`)}
   relationshipExposure() { return cy.get("#relationshiprelationshipExposure")}
   relationshipState() {return cy.get("#relationshipbookingStateLocation")}
   

   navigateToDetailsPage() {
      this.detailsTab().click({force: true})
   }
   
   validateRelationshipOwnerDefaultValue(fieldtovalidate, data){
      let defaultValue = data.relationship[fieldtovalidate]
    this.owner().eq(0).should('have.value',defaultValue)
   }
   
   
   validateDefaultValue(fieldtovalidate,data){
      let defaultValue = data.relationship[fieldtovalidate]
      this.fieldElementValue(fieldtovalidate).should('include.value',defaultValue)
   }

   validateDdlDefaultValue(fieldtovalidate,data){
      let defaultValue =  data.relationship[fieldtovalidate]
    this.drpDwnfieldElement(fieldtovalidate).find('option:selected').should('include.text',defaultValue)
   }

   getRelationshipExposureValue(){
      let path = 'cypress/fixtures/pricingpagedata.json'
      this.relationshipExposure().invoke('val').then((text) => {
         cy.readFile(path).then((data) => {
            data.pricingpage_Exposure = text
            cy.writeFile(path,data)
         })
      })
   }

   getRelationshipStateValue(){
      let path = 'cypress/fixtures/pricingpagedata.json'
      this.relationshipState().find('option:selected').invoke('text').then((text) => {
         cy.readFile(path).then((data) => {
            data.pricingpage_State = text
            cy.writeFile(path,data)
         })
      })
   }
   

}

export default RelationshpipDetailsPage = new RelationshpipDetailsPage