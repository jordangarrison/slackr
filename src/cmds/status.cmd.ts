import { Workspace } from './../config/config.model'
import { SlackerArgs } from '../index'
import config from '../config'
import { InputStatus } from '../status/status.model'
import { statusQuestion } from '../questions'
import statusService from '../status/status.service'
import { Argv } from 'yargs'
import _ from 'lodash'

type statusArgs = SlackerArgs & {
  message: string
  emoji: string
  time: string
}

const getCliConfig = (argv: statusArgs) => {
  if (argv.workspace && argv.type && argv.channel && argv.token) {
    return {
      org: argv.workspace,
      type: argv.type,
      token: argv.workspace,
      channel: argv.workspace,
      standup: true,
      default: true
    } as Workspace
  }
  return undefined
  // return _.pickBy<Workspace>(
  //   {
  //     org: argv.workspace,
  //     type: argv.type,
  //     token: argv.workspace,
  //     channel: argv.workspace,
  //     standup: true,
  //     default: true
  //   },
  //   _.identity
  // )
}

exports.command = 'status [message]'
exports.aliases = ['st', 's']
exports.describe = 'Set the status for slack'
exports.builder = (yargs: Argv<{}>) => {
  return yargs.options({
    emoji: {
      type: 'string',
      alias: ['e', 'emj'],
      describe: 'Emoji for status',
      default: ':speech_balloon:'
    },
    time: {
      type: 'string',
      alias: ['t'],
      describe: 'How long to keep status set',
      default: '30m'
    }
  })
}
exports.handler = async (argv: statusArgs) => {
  const status: InputStatus = argv.message
    ? {
        status: argv.message,
        emoji: argv.emoji,
        time: argv.time
      }
    : await statusQuestion().catch(err => {
        console.error(err)
        process.exit(1)
      })
  const configFile = argv.config
  const cfg = await config.init(configFile)
  const cliConfig = getCliConfig(argv)
  const finalConfig = cliConfig ? config.merge(cfg, cliConfig) : cfg

  _(finalConfig.workspaces).forEach(async workspace => {
    await statusService.setStatus(status, workspace).catch(err => console.error(err))
  })
}
