import request from '@shared/request'

export const getServerTime = async () => {
  const response = await request.get('/api/server-time')
  return (response as any).time
}
