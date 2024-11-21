
class ApiPage {

    getDealLoadTime(perfTestDealId, iteration) {
        let readings = []
        let i
        for (i = 0; i < iteration; i++) {
            cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
                cy.request({
                    method: 'POST',
                    url: '/api/flash/deal',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`,
                    },
                    body: {
                        "dealId": `${perfTestDealId}`,
                        "refinanceProducts": null,
                        "removeProducts": null
                    },
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        readings.push((response.duration))
                        cy.writeFile('cypress/fixtures/dealData.json', response)
                    })
            })
        }
        cy.writeFile('cypress/fixtures/dealReadings.json', { perfReadings: readings })

    }


    getSearchLoadTime(searchTearm, entity, iteration) {
        let readings = []
        let i
        for (i = 0; i < iteration; i++) {
            cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
                cy.request({
                    method: 'GET',
                    url: 'api/globalsearch',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`,
                    },
                    qs: {
                        "query": `${searchTearm}`,
                        "entityType": `${entity}`,

                    },
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        readings.push((response.duration))
                        cy.writeFile('cypress/fixtures/searchData.json', response)
                    })

            })
        }
        cy.writeFile('cypress/fixtures/searchReadings.json', { perfReadings: readings })

    }

    getEntityDetails(searchTerm, entity) {
            cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
                cy.request({
                    method: 'GET',
                    url: '/api/globalsearch',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`,
                    },
                    qs: {
                        "query": `${searchTerm}`,
                        "entityType": `${entity}`,

                    },
                })
                    .then((response) => {
                        expect(response.status).to.eq(200) 
                        cy.writeFile('cypress/fixtures/entitydetails.json', response.body)
                        cy.writeFile('cypress/fixtures/entitydetails.txt', response.body.items[0].id)
                    })
            })
    }


    changeClientId1(searchTerm, path) {
        this.getEntityDetails(searchTerm, 'Counterparty')
        cy.readFile('cypress/fixtures/entitydetails.txt').then(id => {
            cy.readFile(path).then(payload => {
                payload.customer.children[1].id = id
                payload.scenarios[0].products[0].parentEntityId = id
                cy.writeFile(path, payload)
            })
        })
    }

    changeClientId2(searchTerm, path) {
        this.getEntityDetails(searchTerm, 'Counterparty')
        cy.readFile('cypress/fixtures/entitydetails.txt').then(id => {
            cy.readFile(path).then(payload => {
                payload.customer.children[2].id = id
                payload.scenarios[1].products[0].parentEntityId = id
                payload.scenarios[1].products[1].parentEntityId = id
                cy.writeFile(path, payload)
            })
        })
    }

    verifyLoadTimeAverage(scenario, baseline) {
        let sum = 0
        let arr = []
        cy.readFile(`cypress/fixtures/${scenario}Readings.json`).then((data) => {
            arr = data.perfReadings
            cy.log('Performance Readings = ' + arr)

            sum = arr.reduce((a, b) => a + b)
            cy.log('Sum of Readings = ' + sum)

            let aveReadings = Math.floor(sum / arr.length)
            cy.log('Average Performance Readings = ' + aveReadings)
            expect(aveReadings).to.not.be.greaterThan(baseline)

        })

    }

    verifyDataImportError() {
        cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
            cy.request({
                method: 'POST',
                url: 'api/admin/importLog/grid',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${resp.body.accessToken}`,
                },
                body: {
                    "filters": [
                        {
                            "field": "Action",
                            "equal": true,
                            "value": 1,
                            "fields": null,
                            "isHidden": null,
                            "isRequired": false,
                            "minLength": 0,
                            "isClientAccess": false,
                            "schemaChangesOnly": null,
                            "isParentClientAccess": null
                        },
                        {
                            "field": "Status",
                            "equal": true,
                            "value": 2,
                            "fields": null,
                            "isHidden": null,
                            "isRequired": false,
                            "minLength": 0,
                            "isClientAccess": false,
                            "schemaChangesOnly": null,
                            "isParentClientAccess": null
                        }
                    ],
                    "start": 1,
                    "limit": 100,
                    "sort": null,
                    "asc": null
                },
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    cy.writeFile('cypress/fixtures/dataImportLogs.json', response) //Save response to fixture
                })
        })

        cy.readFile('cypress/fixtures/dataImportLogs.json') //Get the fixture data
            .then(resp => {
                expect(resp.body.pagedList.total).to.eq(0) // Will check error message

            })

    }

    updateStartAssessmentBody() {
        cy.log("Update Start Assessment Body with Deal Id")
        cy.readFile('cypress/fixtures/cba_qa/dealData.json').then(dealData => {
            cy.log("Deal Id = " + dealData.dealId)
            cy.readFile('cypress/fixtures/cba_qa/esgStartAssessmentBody.json').then(startBody => {
                startBody.dealId = dealData.dealId
                cy.writeFile('cypress/fixtures/cba_qa/esgStartAssessmentBody.json', startBody)
            })
        })
    }

    postStartAssessment(esgUrl) {
        cy.log("ESG Start Assessment")
        cy.readFile('cypress/fixtures/apiLogin.json').then(login => {
            cy.readFile('cypress/fixtures/cba_qa/esgStartAssessmentBody.json').then(startBody => {
                cy.request({
                    method: 'POST',
                    url: `${esgUrl}api/v2/esg`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.body.accessToken}`,
                    },
                    body: startBody
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        cy.log("ESG Id is " + response.body)
                        cy.writeFile('cypress/fixtures/startEsgResponse.json', response) //Save response to fixture
                    })
            })
        })
    }

    postApprovalInfoESG() {
        cy.log("Get Approval Info")
        cy.readFile('cypress/fixtures/apiLogin.json').then(login => {
            cy.readFile('cypress/fixtures/startEsgResponse.json').then(resp => {
                cy.log("ESG Id is " + resp.body)
                cy.request({
                    method: 'POST',
                    url: `connect/v5/ESG/${resp.body}/3/info`,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json-patch+json",
                        "Authorization": `Bearer ${login.body.accessToken}`,
                    },
                    body: {},
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        response.body.approvalLevelInfos[0].isSelfApproval = true,
                            cy.log("is self approve = " + response.body.approvalLevelInfos[0].isSelfApproval)
                        cy.writeFile('cypress/fixtures/approvalInfoEsgResponse.json', response.body.approvalLevelInfos) //Save response to fixture
                    })
            })
        })
    }

    postApproveESG() {
        cy.log("Post ESG Approval")
        cy.readFile('cypress/fixtures/apiLogin.json').then(login => {
            cy.readFile('cypress/fixtures/startEsgResponse.json').then(startEsg => {
                cy.readFile('cypress/fixtures/approvalInfoEsgResponse.json').then(approvalInfo => {
                    cy.log("ESG Id is " + startEsg.body)
                    cy.request({
                        method: 'POST',
                        url: `connect/v5/ESG/submit/${startEsg.body}/register`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${login.body.accessToken}`,
                            "Accept": "application/json",
                        },
                        body: {
                            "entityId": startEsg.body,
                            "actionCode": "S",
                            "statusReasonCode": null,
                            "approvalLevelInfos": approvalInfo
                        }
                    })
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            cy.writeFile('cypress/fixtures/esgapprovalresp.json', response) //Save response to fixture
                        })

                })
            })
        })
    }

    updateDealBody(dealCode, dealName, path) {
        cy.readFile(path).then(data => {
            data.dealCode = dealCode
            data.name = dealName
            cy.log('dealcode = ', dealCode)
            cy.log('deal name = ', dealName)
            cy.writeFile(path, data)
        })
    }

    postPricingDeal(dealCode, body, schema) {
        cy.readFile(body).then(reqbody => {
            cy.request({
                method: 'POST',
                url: `/connect/v5/pricing/deals/${dealCode}`,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": Cypress.env('apiKey'),
                    "Accept": "application/json",
                },
                body: reqbody
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    cy.writeFile('cypress/fixtures/postpricingdealresp.json', response.body)
                })
        })
    }

    getDeal(dealCode, getDealSchema) {
        cy.request({
            method: 'GET',
            url: `/connect/v5/Deals/${dealCode}`,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": Cypress.env('apiKey'),
                "Accept": "application/json",
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.writeFile('cypress/fixtures/getdealdetailsresp.json', response.body)
            })
    }

    getRelationships(path, getRelastionshipSchema) {
        cy.readFile(path).then(reqbody => {
            cy.log('Customer Code = ', reqbody.customerCode)
            cy.request({
                method: 'GET',
                url: `/connect/v5/Relationships/${reqbody.customerCode}`,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": Cypress.env('apiKey'),
                    "Accept": "application/json",
                },
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    cy.writeFile('cypress/fixtures/getrelationshipresp.json', response.body)
                })
        })
    }

   
    updateDealCreatePayload(path, dealCode, dealName) {
        //Update Deal Name
        cy.readFile(path).then((obj) => {
            obj.dealCode = dealCode
            obj.name = dealName
            cy.writeFile(path, obj)
        })
    }

    //Create deal using Connect API
    createDealWithApi(path, dealCode) {
        cy.readFile(path).then(reqbody => {
                cy.request({
                    method: 'POST',
                    url: `/connect/v5/pricing/deals/${dealCode}`,
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": Cypress.env('apiKey')
                    },
                    body: reqbody
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        cy.writeFile('cypress/fixtures/dealDetailsResponse', response.body)
                        cy.writeFile('cypress/fixtures/dealId.txt', response.body.deal.uid)
                    })
        })
    }


    //Create deal using Internal API 
    createDealWithInternalApi(path, dealName) {
        cy.readFile(path).then((obj) => {
            obj.name = dealName
            cy.writeFile(path, obj)
        })

        cy.readFile(path).then(reqbody => {
            cy.readFile('cypress/fixtures/apiLogin.json').then((resp) => {
                cy.request({
                    method: 'POST',
                    url: `https://globalqa.dpxpricing.com/api/deals`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`,
                    },
                    body: reqbody
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        cy.writeFile('cypress/fixtures/deaId.txt', response.body)
                    })
            })
        })
    }




     cleanJsonData(path) {
        this.convertJsonId(path)
        this.convertNameId(path)
        this.convertOuterId(path)
        this.convertrowKey(path)
        this.convertlinkId(path)
        this.convertName(path)
    }

    convertJsonId(path){
        cy.readFile(path)
            .then((body) =>{
                var updated = JSON.stringify(body)
                var replacement1 = `"test2":"apitest2"`
                var updatedresp1 = updated.replace(/"id":".{8}\-.{4}-.{4}-.{4}-.{12}"/g, replacement1) 
                var newresp = JSON.parse(updatedresp1)
                cy.writeFile(path, newresp)
            })
    }



    convertNameId(path){
        cy.readFile(path)
            .then((body) =>{
                var updated = JSON.stringify(body)
                var replacement1 = `"test3":"apitest3"`
                var updatedresp1 = updated.replace(/"name":".{8}\-.{4}-.{4}-.{4}-.{12}"/g, replacement1) 
                var newresp = JSON.parse(updatedresp1)
                cy.writeFile(path, newresp)
            })
    }


    convertrowKey(path){
        cy.readFile(path)
            .then((body) =>{
                var updated = JSON.stringify(body)
                var replacement1 = `"test4":"apitest4"`
                var updatedresp1 = updated.replace(/"rowKey":".{8}\-.{4}-.{4}-.{4}-.{12}"/g, replacement1) 
                var newresp = JSON.parse(updatedresp1)
                cy.writeFile(path, newresp)
            })
    }

    convertlinkId(path){
        cy.readFile(path)
            .then((body) =>{
                var updated = JSON.stringify(body)
                var replacement1 = `"test5":"apitest5"`
                var updatedresp1 = updated.replace(/"link":".flash.deal..{8}\-.{4}-.{4}-.{4}-.{12}"/g, replacement1) 
                var newresp = JSON.parse(updatedresp1)
                cy.writeFile(path, newresp)
            })
    }

    convertOuterId(path){
        cy.readFile(path)
            .then((body) =>{
                var updated = JSON.stringify(body)
                var replacement1 = `"test6":"apitest6"`
                var updatedresp1 = updated.replace(/"outerId":"\d{10}"/g, replacement1) 
                var newresp = JSON.parse(updatedresp1)
                cy.writeFile(path, newresp)
            })
    }

    convertName(path){
        cy.readFile(path)
            .then((body) =>{
                body.profit.entity.name = "DealCheck"
                cy.writeFile(path, body)
            })
    }




    getDealDetails(responsePath) {
        let path = "cypress/fixtures/deaId.txt"
        cy.readFile(path).then((id) => {
            let DealId = id
            cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
                cy.request({
                    method: 'POST',
                    url: '/api/flash/deal',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`,
                    },
                    body: {
                        "dealId": `${DealId}`,
                        "refinanceProducts": null,
                        "removeProducts": null
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    cy.writeFile(responsePath, response.body)
                })
            })
        })
    }

    getDealResults(responsePath) {
        cy.wait(2000)
        let path = "cypress/fixtures/dealId.txt"
        cy.readFile(path).then((id) => {
            cy.log('Deal id is ', id)
            let DealId = id
            let readings = []
            cy.readFile('cypress/fixtures/apiLogin.json').then(resp => {
                cy.request({
                    method: 'POST',
                    url: '/api/flash/deal',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${resp.body.accessToken}`
                    },
                    body: {
                        "dealId": `${DealId}`,
                        "refinanceProducts": null,
                        "removeProducts": null
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    readings.push((response.duration))
                    cy.writeFile(responsePath, response.body.results)
                })
            })
        })    
    }

    verifyTwoScenaios(path, scenario1,scenario2){

        cy.readFile(path).then((response) => {
            let name1 = response.dealEntity.scenarios[0].name
            let name2 = response.dealEntity.scenarios[1].name
            expect(scenario1).to.equal(name1)
            expect(scenario2).to.equal(name2)
        })
      
    }

    verifyTwoClients(path, client1, client2){
        cy.readFile(path).then((response) => {
           let name1 = response.results.profit.children[0].children[0].entity.name
           let name2 = response.results.profit.children[1].children[0].entity.name
           expect(client1).to.equal(name1)
           expect(client2).to.equal(name2)
        })
    }

    verifyMultipleProducts(path, product1,product2,product3){
        cy.readFile(path).then((response) => {
           let name1 =  response.dealEntity.scenarios[0].products[0].name
           let name2 =  response.dealEntity.scenarios[1].products[0].name
           let name3 =  response.dealEntity.scenarios[1].products[1].name

           expect(product1).to.equal(name1)
           expect(product2).to.equal(name2)
           expect(product3).to.equal(name3)

        })
    }



    validateJsonData(path, path1) {
        cy.readFile(path).then(obj1 => {
            cy.readFile(path1).then(obj2 => {
                expect(obj1).to.deep.equal(obj2)
            })
        })
    }



    verifyMultipleCurrencies(path, currency1,currency2, currency3){
        cy.readFile(path).then((response) => {
            let type1 = response.dealEntity.scenarios[0].products[0].currencyCode
            let type2 = response.dealEntity.scenarios[1].products[0].currencyCode
            let type3 = response.dealEntity.scenarios[1].products[1].currencyCode

            expect(currency1.trim()).to.equal(type1)
            expect(currency2.trim()).to.equal(type2)
            expect(currency3.trim()).to.equal(type3)

        })
    }

}


export default ApiPage = new ApiPage