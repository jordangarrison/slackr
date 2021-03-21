import { ClientTypes } from './config/config.model'
import yargs from 'yargs'

export type SlackerArgs = {
  config: string
  workspace: string
  channel: string
  token: string
  type: ClientTypes
}

yargs
  .scriptName('slackr')
  .usage('$0 <cmd> [args]')
  .commandDir('cmds')
  .demandCommand()
  .options({
    config: {
      type: 'string',
      alias: 'c',
      describe: 'Specify a configuration file for slackr'
    },
    workspace: {
      type: 'string',
      alias: ['ws', 'w', 'server'],
      describe: 'Specify the name of the slackr'
    },
    channel: {
      type: 'string',
      alias: ['ch'],
      describe: 'Specify the channel to use for this command (overrides the default chanel configured'
    },
    token: {
      type: 'string',
      alias: 'token',
      describe: 'Specify the token to use for the request'
    },
    type: {
      type: 'string',
      describe: 'Specify the type of workspace you are using',
      choices: ['slack']
    }
  })
  .help().argv
