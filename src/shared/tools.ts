export const jsonStringify = (obj: any) => {
  return JSON.stringify(obj, null, 2)
}

export const parseCookie = (cookie: string) => {
  if (!cookie) return {}
  const cookies = cookie.split(';')
  const result = {} as Record<string, string>
  for (const c of cookies) {
    const [key, value] = c.trim().split('=')
    result[key] = value
  }
  return result
}

export const getRandomInt = (
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER
) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export const getRandomString = (length: number = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
