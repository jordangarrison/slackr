import dotenv from 'dotenv'

dotenv.config()

export default {
  token: process.env.SLACK_TOKEN
}
