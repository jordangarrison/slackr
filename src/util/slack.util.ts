import { WebClient } from '@slack/web-api'
import { Channel, ChannelType } from './slack.model'
import _ from 'lodash'

export const client = new WebClient()

const getPaginatedChannels = async (
  types: ChannelType[],
  limit = 1000,
  finalResults: Channel[] = [],
  cursor?: string
) => {
  const result = await client.conversations.list({
    types: _(types).join(','),
    exclude_archived: true,
    cursor,
    limit
  })
  if (result.channels) {
    finalResults.push(...(result.channels as Channel[]))
  } else {
    throw new Error('Cannot list Channels')
  }
  if (result.response_metadata && result.response_metadata.next_cursor) {
    await getPaginatedChannels(types, limit, finalResults, result.response_metadata.next_cursor)
  }
  return finalResults
}

export const findChannel = async (channel: string, types?: ChannelType[], limit = 1000) => {
  const channels: Channel[] = await listChannels(types, limit)
  const foundChannel = _.find(channels, c => c.name === channel)
  if (!foundChannel) {
    throw new Error(`Cannot find channel ${channel}`)
  }
  return foundChannel
}

export const listChannels = async (types?: ChannelType[], limit = 1000) => {
  if (!types) {
    types = ['private_channel', 'public_channel']
  }
  try {
    return await getPaginatedChannels(types, limit)
  } catch (err) {
    throw err
  }
}

export default {
  client,
  findChannel,
  listChannels
}
