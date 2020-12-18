import { statusQuestion } from './../questions'

exports.command = 'status [emoji] [message]'
exports.aliases = ['st', 's']
exports.describe = 'Set the status for slack'
exports.handler = async (argv: unknown) => {
  console.log(argv)
  const response = await statusQuestion().catch(err => console.error(err))
  console.log(response)
}
