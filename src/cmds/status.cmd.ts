import { statusQuestion } from './../questions'
import * as statusService from '../status/status.service'

exports.command = 'status [emoji] [message]'
exports.aliases = ['st', 's']
exports.describe = 'Set the status for slack'
exports.handler = async (argv: unknown) => {
  console.log(argv)
  const status = await statusQuestion().catch(err => {
    console.error(err)
    process.exit(1)
  })
  console.log(status)
  await statusService.setStatus(status).catch(err => console.error(err))
}
