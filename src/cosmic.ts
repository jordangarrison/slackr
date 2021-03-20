import { cosmiconfig } from 'cosmiconfig'
import _ from 'lodash'

const moduleName = 'slackr'
const searchPath = ['~/.slackrrc', '~/.slackr.yaml', '.slackr.yaml']

export type Workspace = {
  org: String
  type: 'slack' | 'discord' | 'teams'
  channel: String
  standup?: Boolean
  default?: Boolean
}

export type SlackrConfig = {
  workspaces: Workspace[]
}

export const initConfig = async (filepath?: string) => {
  if (filepath) {
    searchPath.push(filepath)
  }
  const explorer = cosmiconfig(moduleName, {
    searchPlaces: searchPath
  })
  const config = await explorer.search()
  if (config && config.config) {
    return config.config as SlackrConfig
  }
  throw new Error(`Cannot find config in search path`)
}

export default {
  initConfig
}
