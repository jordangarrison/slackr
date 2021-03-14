# slackr

A slack CLI for lazy people.

## Installation

No package is built for this yet, for now simply clone this repo and `npm i`.

## Usage

Usage and examples for each command are located below.

### Status

Status will update your slack status. This is an easy quick way to set the status when you're on the go.

```sh
slackr status
```

Status really designed to be used with quick shell aliases for when you need to go do something. For example you could
use the following when you are picking up your kids from school.

```sh
alias carpool='slackr status --emoji :school_satchel: --time 45m "Picking up the kids from school"'
```

A list of aliases for various activities are where Slackr truly shines.

### Standup

Standup will send a standup to your `${SLACK_CHANNEL}` environment variable. If nothing is given it will prompt you for
your standup using enquirer.

```sh
slackr standup
```

## Get a Slack Token

Using the methodology from the [Emacs Slack
Repo](https://github.com/yuya373/emacs-slack#how-to-get-token), navigate to your slack workspace customization portal at
https://[your-workspace].slack.com/customize. Then Log in with your credentials for your workspace if needed. Once you
are on the customization screen you can dump the token by running the following in the console.

```js
window.prompt('your api token is: ', TS.boot_data.api_token)
```
