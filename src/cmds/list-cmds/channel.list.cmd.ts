import { ChannelType } from './../../util/slack.model'
import _ from 'lodash'
import { Argv } from 'yargs'
import slack from '../../util/slack.util'

type listCmd = {
  channelName?: string
  delimiter: string
  type: string
  limit: number
}

exports.command = 'channel [channel-name]'
exports.aliases = ['ch']
exports.describe = 'List Channels in slack'
exports.builder = (yargs: Argv<{}>) => {
  return yargs
    .positional('channel-name', {
      type: 'string',
      describe: 'Channel for lookup'
    })
    .options({
      delimiter: {
        type: 'string',
        alias: 'd',
        describe: 'delimiter for channel return output',
        default: '\n'
      },
      type: {
        type: 'string',
        describe: 'Channel type (im, mpim, public_channel, private_channel)',
        alias: 't',
        default: 'public_channel,private_channel'
      },
      limit: {
        type: 'number',
        describe: 'Maximum number of channels to print out',
        alias: 'l',
        default: 1000
      }
    })
}
exports.handler = async (argv: listCmd) => {
  const channel = argv.channelName
  const delimiter = argv.delimiter
  const channelType: ChannelType[] = _(argv.type)
    .split(',')
    .map(i => i as ChannelType)
    .value()
  const limit = argv.limit
  console.log(`Looking up channels ${channel || ''}`)
  if (channel) {
    const foundChannel = (await slack.findChannel(channel, channelType, limit)).name
    console.log(`Found channel\n${foundChannel}`)
    return
  }
  const channels = await slack.listChannels()
  const channelNames = _(channels)
    .map(c => c.name)
    .compact()
    .join(delimiter)
  console.log(`Found the following channel names\n${channelNames}`)
}
