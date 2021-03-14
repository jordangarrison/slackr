import ms from 'humanize-ms'
import { InputStatus, SlackStatus } from './status.model'
import slack from '../util/slack.util'
import { UsersProfileSetArguments } from '@slack/web-api'

export const setStatus = async (status: InputStatus) => {
  const slackStatus: SlackStatus = {
    status_emoji: status.emoji,
    status_text: status.status,
    status_expiration: status.time != undefined ? calculateExpiration(status.time) : undefined
  }
  console.debug(slackStatus)
  const statusPayload: UsersProfileSetArguments = {
    profile: JSON.stringify(slackStatus)
  }
  return await slack.client.users.profile.set(statusPayload)
}

const calculateExpiration = (time: string) => {
  const milliseconds = convertToMs(time)
  const currentDate = Math.round(Date.now())
  return Math.floor((currentDate + milliseconds) / 1000)
}

const convertToMs = (duration: string) => {
  return ms(duration)
}

export default {
  setStatus
}
