import config from '../config'
import { WebClient } from '@slack/web-api'

export const slackWebClient = new WebClient(config.token)

export default slackWebClient
