import { prompt } from 'enquirer'

export const statusQuestion = async () => {
  const form = {
    type: 'form',
    name: 'status',
    message: 'Please enter your new slack status',
    choices: [
      { name: 'emoji', message: 'emoji', initial: ':speech_balloon:' },
      {
        name: 'status',
        message: 'Status',
        initial: "I'll be away for a few minutes"
      },
      { name: 'time', message: 'Time for Status', initial: '30m' }
    ]
  }
  const response = await prompt(form)
  return response['status']
}
