import { KnownBlock } from '@slack/types'
import _ from 'lodash'
import slack from '../util/slack.util'
import { InputStandup } from './standup.model'

const createStandupMessage = (standup: InputStandup): KnownBlock[] => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Daily Standup',
        emoji: true
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Yesterday*'
      }
    },
    {
      type: 'section',
      fields: _.map(standup.yesterday.split(';'), y => {
        return {
          type: 'plain_text',
          text: y,
          emoji: true
        }
      })
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Today*'
      }
    },
    {
      type: 'section',
      fields: _.map(standup.today.split(';'), y => {
        return {
          type: 'plain_text',
          text: y,
          emoji: true
        }
      })
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Blockers*'
      }
    },
    {
      type: 'section',
      fields: _.map(standup.blockers.split(';'), y => {
        return {
          type: 'plain_text',
          text: y,
          emoji: true
        }
      })
    }
  ]
}

export const sendStandup = async (standup: InputStandup) => {
  const slackStandup = createStandupMessage(standup)
  const channel = await slack.findChannel(standup.channel)
  if (channel) {
    await slack.client.chat.postMessage({
      channel: channel.id,
      blocks: slackStandup,
      text: ''
    })
  } else {
    console.log(`Cannot find channel ${channel}`)
  }
}

export default {
  sendStandup
}
