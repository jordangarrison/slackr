export type ChannelType = 'public_channel' | 'private_channel' | 'im' | 'mpim'

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
