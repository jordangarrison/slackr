import dotenv from 'dotenv'

dotenv.config()

export default {
  token: process.env.SLACK_TOKEN,
  channel: process.env.SLACK_CHANNEL
}
