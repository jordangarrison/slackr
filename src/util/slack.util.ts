import config from '../config'
import { WebClient } from '@slack/web-api'
import _ from 'lodash'

export interface Channel {
  id: string
  name: string
  is_channel: boolean
  is_group: boolean
  is_im: boolean
  created: number
  is_archived: boolean
  is_general: boolean
  unlinked: number
  name_normalized: string
  is_shared: boolean
  is_frozen: boolean
  parent_conversation?: null
  creator: string
  is_ext_shared: boolean
  is_org_shared: boolean
  shared_team_ids: string[]
  pending_shared: any[]
  pending_connected_team_ids: any[]
  is_pending_ext_shared: boolean
  is_member: boolean
  is_private: boolean
  is_mpim: boolean
  topic: Purpose
  purpose: Purpose
  previous_names: any[]
  num_members: number
}

export interface Purpose {
  value: string
  creator: string
  last_set: number
}

const token = config.token
if (!token) {
  throw Error('No slack token given')
}
export const client = new WebClient(config.token)

export const findChannel = async (channel: string) => {
  try {
    const result = await client.conversations.list({
      types: 'public_channel,private_channel,im,mpim'
    })
    if (result.channels) {
      const channels: Channel[] = result.channels as Channel[]
      return _(channels).find(c => c.name === channel)
    } else {
      throw new Error(`Channel ${channel} not found`)
    }
  } catch (err) {
    throw err
  }
}

export default {
  client,
  findChannel
}
