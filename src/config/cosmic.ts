import { cosmiconfig } from 'cosmiconfig'
import { SlackrConfig } from './config.model'
import _ from 'lodash'

const moduleName = 'slackr'
const searchPath = ['~/.slackrrc', '~/.slackr.yaml', '.slackr.yaml']

export const initConfig = async (filepaths?: string[]) => {
  if (filepaths) {
    searchPath.push(..._(filepaths).compact().value())
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
