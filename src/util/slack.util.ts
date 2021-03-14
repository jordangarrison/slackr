import config from '../config'
import { WebClient } from '@slack/web-api'

const token = config.token
if (!token) {
  throw Error('No slack token given')
}
export const slackWebClient = new WebClient(config.token)

export default slackWebClient
