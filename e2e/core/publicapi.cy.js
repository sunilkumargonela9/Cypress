import ApiPage from '../../pageObjects/ApiPage'
import dayjs from 'dayjs'


const dealCode = dayjs().unix()
const dealName = 'Public API Test Deal' + dealCode
const postBody = 'cypress/fixtures/global_qa/publicapi_post_createdeal_body.json'
const postPricingSchema = 'cypress/fixtures/global_qa/publicapi_post_createdeal_resp_schema.json'
const getDealSchema = 'cypress/fixtures/global_qa/publicapi_get_deal_resp_schema.json'
const getRelationshipSchema = 'cypress/fixtures/global_qa/publicapi_get_relationship_resp_schema.json'

//Need to confirm test scenario with Oliver
describe('Public API', () => {
    it('Verify POST Pricing/{dealcode} Endpoint', () => {
        ApiPage.updateDealBody(dealCode, dealName, postBody)
        ApiPage.postPricingDeal(dealCode, postBody, postPricingSchema)
    });

    it('Verify GET Deals/{code} Endpoint', () => {
        ApiPage.getDeal(dealCode, getDealSchema)
    });


    it('Verify GET Relationships/{code} Endpoint', () => {
        ApiPage.getRelationships(postBody, getRelationshipSchema)
    });

});








