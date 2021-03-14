import { InputStatus } from './../status/status.model'
import { statusQuestion } from './../questions'
import * as statusService from '../status/status.service'
import { Argv } from 'yargs'

type statusArgs = {
  message: string
  emoji: string
  time: string
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
  await statusService.setStatus(status).catch(err => console.error(err))
}
