import ms from 'humanize-ms'
import { InputStatus, SlackStatus } from './status.model'
import { slackWebClient } from './../util/slack.util'
import { UsersProfileSetArguments } from '@slack/web-api'

export const setStatus = async (status: InputStatus) => {
  const slackStatus: SlackStatus = {
    status_emoji: status.emoji,
    status_text: status.message,
    status_expiration: calculateExpiration(status.time)
  }
  const statusPayload: UsersProfileSetArguments = {
    profile: JSON.stringify(slackStatus)
  }
  slackWebClient.users.profile.set(statusPayload)
}

const calculateExpiration = (time: string) => {
  const milis = convertToMilis(time)
  const currentDate = Date.now()
  return currentDate + milis
}

const convertToMilis = (duration: string) => {
  return ms(duration)
}
