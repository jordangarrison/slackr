import yargs from 'yargs'

export type SlackerArgs = {
  config: string
}

yargs
  .scriptName('slackr')
  .usage('$0 <cmd> [args]')
  .commandDir('cmds')
  .demandCommand()
  .options({
    config: {
      type: 'string',
      alias: 'c',
      describe: 'Specify a configuration file for slackr'
    }
  })
  .help().argv
