export const jsonStringify = (obj: any) => {
  return JSON.stringify(obj, null, 2)
}

export const parseCookie = (cookie: string) => {
  const cookies = cookie.split(';')
  const result = {} as Record<string, string>
  for (const c of cookies) {
    const [key, value] = c.trim().split('=')
    result[key] = value
  }
  return result
}
