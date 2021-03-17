import _ from 'lodash'
import convict from 'convict'
import yaml from 'js-yaml'

const configFiles = [..._(process.env.SLACKR_CONFIG).split(',').compact().value(), `${process.env.HOME}/.slackr.yaml`]
console.log(configFiles)

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.load })

const org = {
  workspace: {
    doc: 'Workspace name for the slack workspace, discord server, or microsoft team you are using',
    format: String,
    env: 'WORKSPACE'
  },
  token: {
    doc: 'Token or other API key auth for slack, discord or teams (see README.md)',
    format: String,
    env: 'TOKEN',
    sensitive: true
  },
  channel: {
    doc:
      'Channel to default to in the given workspace, you can still specify other channels dynamically with command line flags',
    format: String,
    env: 'CHANNEL'
  },
  standup: {
    doc:
      'Whether or not to use this for sending out your daily standup. If this is false or omitted slackr will default to the default workspace',
    format: Boolean,
    default: false
  },
  default: {
    doc:
      'Use this to recommend this workspace as the default for single workspace actions such as sending messages, will default to the first workspace entry if left blank',
    format: Boolean,
    default: false
  }
}

const config = convict({
  slack: {
    doc: 'Slack configurations',
    children: org
  },
  discord: {
    doc: 'Discord configurations',
    children: org
  },
  teams: {
    doc: 'Microsoft Teams configurations',
    children: org
  },
  defaultApp: {
    doc: 'Specify the default app you use for your primary communication (defaults to slack)',
    format: ['slack', 'discord', 'teams'],
    env: 'DEFAULT_APP',
    default: 'slack'
  }
})

config.loadFile(configFiles)

export default config
