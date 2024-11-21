///<reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)



//@type {Cypress.PluginConfig}








// promisified fs module
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}
const { isFileExist } = require('cy-verify-downloads');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')


// plugins file
module.exports = (on, config) => {
  // accept a configFile value or use development by default
  baseUrl: process.env.CYPRESS_BASE_URL || config.baseUrl // set the baseUrl dynamically
  const file = config.env.configFile || 'global_qa'
  on('task', { isFileExist })
  on('task', { downloadFile })
  return getConfigurationByFile(file)
  require('cypress-mochawesome-reporter/plugin')(on);
}





