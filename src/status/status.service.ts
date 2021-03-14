import ms from 'humanize-ms'
import { InputStatus, SlackStatus } from './status.model'
import { slackWebClient } from './../util/slack.util'
import { UsersProfileSetArguments } from '@slack/web-api'

export const setStatus = async (status: InputStatus) => {
  const slackStatus: SlackStatus = {
    status_emoji: status.emoji,
    status_text: status.message,
    status_expiration:
      status.time != undefined ? calculateExpiration(status.time) : undefined
  }
  const statusPayload: UsersProfileSetArguments = {
    profile: JSON.stringify(slackStatus)
  }
  return await slackWebClient.users.profile.set(statusPayload)
}

const calculateExpiration = (time: string) => {
  console.debug(time)
  const milliseconds = convertToMs(time)
  console.debug(milliseconds)
  const currentDate = Math.round(Date.now())
  console.debug(currentDate)
  return Math.floor((currentDate + milliseconds) / 1000)
}

const convertToMs = (duration: string) => {
  return ms(duration)
}
