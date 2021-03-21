export type Workspace = {
  org: String
  type: ClientTypes
  channel: String
  token: String
  standup?: Boolean
  default?: Boolean
}

export type SlackrConfig = {
  workspaces: Workspace[]
}

export type ClientTypes = 'slack' | 'discord' | 'teams'
