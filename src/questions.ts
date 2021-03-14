import config from './config'
import { prompt } from 'enquirer'
import { InputStatus } from './status/status.model'
import { InputStandup } from './standup/standup.model'

export const statusQuestion = async () => {
  const form = {
    type: 'form',
    name: 'status',
    message: 'Please enter your new slack status',
    choices: [
      { name: 'emoji', message: 'emoji', initial: ':speech_balloon:' },
      { name: 'status', message: 'Status', initial: "I'll be away for a few minutes" },
      { name: 'time', message: 'Time for Status', initial: '30m' }
    ]
  }
  const response = await prompt(form)
  return response['status'] as InputStatus
}

export const standupQuestion = async () => {
  const form = {
    type: 'form',
    name: 'standup',
    message: 'Please enter your daily standup',
    choices: [
      { name: 'yesterday', message: 'Yesterday', initial: 'N/A' },
      { name: 'today', message: 'Today', initial: 'What are you going to do today?' },
      { name: 'blockers', message: 'Blockers', initial: 'N/A' },
      { name: 'channel', message: 'Channel to send', initial: config.channel }
    ]
  }
  const response = await prompt(form)
  return response['standup'] as InputStandup
}

export default {
  statusQuestion,
  standupQuestion
}
