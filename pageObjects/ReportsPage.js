import ProductPage from "./ProductPage"
class ReportsPage {
    ddReportName() { return cy.get('[name="reportName"]') }
    btnGenerate() { return cy.get('.btn.btn-sm.btn-icon.btn-primary') }
    btnDownload() { return cy.get('.btn.btn-sm') }
    reportTable() { return cy.get("cnv-widget-table") }
    reportDdl() { return cy.get("select[name='reportName']") }

    validateDSR(dsrValue) {
        this.ddReportName().should('have.value', dsrValue)
    }
    validateDSR(dsrValue) {
        this.ddReportName().should('have.value', dsrValue)
    }

    clickGenerate() {
        this.btnGenerate().contains('Generate').click({ force: true })
    }

    clickDownload() {
        this.btnDownload().contains('Download').click({ force: true })
    }

    selectReportType(type) {
        this.reportDdl().select(type)
    }


    clickDownload() {
        this.btnDownload().contains('Download').click({ force: true })
    }

    getReportData(fieldName) {
        let path = "cypress/fixtures/generatedreportdata.json"
        ProductPage.dataTable().contains(fieldName).next().invoke('text').then((text) => {
            cy.readFile(path).then((data) => {
                data["report_" + fieldName] = text
                cy.writeFile(path, data)
            })
        })

    }

    getReportDetailedForeCastData(fieldName) {
        let path = "cypress/fixtures/generatedreportdata.json"
        cy.contains('Detailed Forecast').nextAll().parent().contains(fieldName).next().invoke('text').then((text) => {
            cy.readFile(path).then((data) => {
                data["reportforecast_" + fieldName] = text
                cy.writeFile(path, data)
            })
        })

    }

    verifyValue(reportData, pricingPageData) {
        let path = "cypress/fixtures/generatedreportdata.json"
        let path1 = 'cypress/fixtures/pricingpagedata.json'
        cy.readFile(path).then((data) => {
            cy.readFile(path1).then((data1) => {
                cy.log("report page value " + data[reportData])
                cy.log("pricing page data " + data1[pricingPageData])
                let report_data = data[reportData].replace('-', '')
                let pricingpage_data = data1[pricingPageData].replace('-', '')
                expect(report_data.trim()).to.equal(pricingpage_data.trim())
            })
        })
    }

    getImpactROEValues(fieldName) {
        let path = "cypress/fixtures/generatedreportdata.json"
        ProductPage.dataTable().contains(fieldName).next().next().invoke('text').then((text) => {
            cy.readFile(path).then((data) => {
                data["report_" + fieldName + "_ImpactROE"] = text
                cy.writeFile(path, data)
            })
        })
    }



    getCustomScheduleReportData() {

        var headerList = []
        this.reportTable().find('th').each(($el) => {
            var headerName = $el.text()
            headerList.push(headerName.trim())
        }).then(() => {
            var jsonData = [];
            this.reportTable().find('tbody').find('tr').each(($row, rowIndex) => {
                jsonData[rowIndex] = {}
                cy.wrap($row).find('td').each(($cell, cellIndex) => {
                    const text = $cell.text()
                    jsonData[rowIndex][headerList[cellIndex]] = text
                    const expected = { jsonData }
                    cy.writeFile("cypress/fixtures/customschedulereportdata.json", expected)
                })
            })
        })
    }

    verifyPrincipalValues(term) {
        let path = 'cypress/fixtures/customschedulereportdata.json'
        cy.readFile(path).then((data) => {
            for (let i = 0; i < term; i++) {
                let principal_value = data.jsonData[i]['Principal']
                let principal_value2 = principal_value.replace(/[^a-zA-Z0-9]/g, '')
                expect(principal_value2).to.equal('0')
            }
        })
    }

    verifyCustomScheduleReportValues(fieldName1, fieldName2, term) {
        let path = 'cypress/fixtures/customschedulereportdata.json'
        cy.readFile(path).then((data) => {
            for (let i = 0; i < term; i++) {
                let interest_value = data.jsonData[i][fieldName1]
                let payment_value = data.jsonData[i][fieldName2]
                expect(interest_value).to.equal(payment_value)
            }
        })
    }

    verifyInterest(rowNum, term) {
        let path = 'cypress/fixtures/calculatedInterest.text'
        let path1 = 'cypress/fixtures/customschedulereportdata.json'
        cy.readFile(path).then((value) => {
            let calculatedInterest = value
            cy.readFile(path1).then((data) => {
                for (let i = rowNum; i < term; i++) {
                    let interest_value = data.jsonData[i].Interest
                    let interest_value2 = interest_value.replace(/[^a-zA-Z0-9]/g, '')
                    expect(calculatedInterest).to.equal(interest_value2)
                }
            })
        })
    }

    cleanUpJson() {
        let path = "cypress/fixtures/generatedreportdata.json"
        let path1 = 'cypress/fixtures/pricingpagedata.json'
        cy.writeFile(path, {})
        cy.writeFile(path1, {})
    }

}

export default ReportsPage = new ReportsPage()