import { SlackrConfig } from './../config/config.model'
import { InputStandup } from './../standup/standup.model'
import { standupQuestion } from './../questions'
import standupService from '../standup/standup.service'
import { Argv } from 'yargs'
import config from '../config'
import _ from 'lodash'

const getStandupChannel = (cfg: SlackrConfig) => {
  return _(cfg.workspaces)
    .filter(w => w.standup == true && w.channel !== undefined)
    .compact()
    .first()?.channel as string
}

exports.command = 'standup [today]'
exports.aliases = ['su']
exports.describe = 'Send a daily standup to a team channel in slack'
exports.builder = async (yargs: Argv<{}>) => {
  const cfg = await config.init()
  const standupChannel = getStandupChannel(cfg)
  return yargs.options({
    yesterday: {
      type: 'string',
      alias: ['y', 'yd'],
      describe: 'Add what you did yesterday',
      default: 'N/A'
    },
    blockers: {
      type: 'string',
      alias: ['b'],
      describe: 'Add blockers',
      default: 'N/A'
    },
    channel: {
      type: 'string',
      alias: ['c'],
      describe: 'Channel to post standup message to',
      default: standupChannel
    }
  })
}
exports.handler = async (argv: InputStandup) => {
  const cfg = await config.init()
  const standupChannel = getStandupChannel(cfg)
  const standup: InputStandup = argv.today
    ? { ...argv }
    : await standupQuestion(standupChannel).catch(err => {
        console.error(err)
        process.exit(1)
      })
  console.debug(standup)
  await standupService.sendStandup(standup).catch(err => console.error(err))
  console.log('Post complete')
}
