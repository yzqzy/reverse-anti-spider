import expressSession from 'express-session'

declare module 'express-session' {
  interface SessionData {
    sid: string
    token: string
    [key: string]: any
  }
}
