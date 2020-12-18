import yargs from 'yargs'

yargs
  .scriptName('slackr')
  .usage('$0 <cmd> [args]')
  .commandDir('cmds')
  .demandCommand()
  .help().argv
