import { Argv } from 'yargs'

exports.command = 'list'
exports.aliases = ['l', 'ls']
exports.describe = 'List'
exports.builder = (yargs: Argv<{}>) => {
  return yargs.commandDir('list-cmds')
}
exports.handler = (argv: any) => {
  return argv
}
