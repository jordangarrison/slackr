import { InputStandup } from './../standup/standup.model'
import { standupQuestion } from './../questions'
import standupService from '../standup/standup.service'
import { Argv } from 'yargs'
import config from '../config'

exports.command = 'standup [today]'
exports.aliases = ['su']
exports.describe = 'Send a daily standup to a team channel in slack'
exports.builder = (yargs: Argv<{}>) => {
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
      default: config.channel
    }
  })
}
exports.handler = async (argv: InputStandup) => {
  const standup: InputStandup = argv.today
    ? { ...argv }
    : await standupQuestion().catch(err => {
        console.error(err)
        process.exit(1)
      })
  console.debug(standup)
  await standupService.sendStandup(standup).catch(err => console.error(err))
  console.log('Post complete')
}
