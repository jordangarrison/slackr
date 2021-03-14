export type InputStatus = {
  emoji?: string
  message: string
  time?: string
}

export type SlackStatus = {
  status_text: string
  status_emoji?: string
  status_expiration?: number
}
