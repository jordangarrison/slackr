import { SlackrConfig, Workspace } from './config.model'
import _ from 'lodash'
import cosmic from './cosmic'
import dotenv from 'dotenv'

export const getEnvConf = () => {
  dotenv.config()
  return _.pickBy(
    {
      org: process.env.SLACKR_ORG,
      type: process.env.SLACKR_TYPE,
      token: process.env.SLACKR_TOKEN,
      channel: process.env.SLACKR_CHANNEL,
      filename: process.env.SLACKR_CONFIG
    },
    _.identity
  )
}

export const init = async (filename?: string) => {
  const envConfig = getEnvConf()
  const files = _.compact([envConfig.filename, filename])
  return await cosmic.initConfig(files)
}

export const merge = (config: SlackrConfig, newConfig: Workspace) => {
  config.workspaces.push(newConfig)
  return config
}

export default {
  init,
  getEnvConf,
  merge
}
