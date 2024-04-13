import { jsonStringify } from '@shared/tools.js'

const check = (orders_keys: string[], keys: string[]) => {
  for (let order of orders_keys) {
    if (keys.includes(order)) {
      keys.splice(0, keys.indexOf(order) + 1)
    } else {
      return false
    }
  }
  return true
}

const getStandardOrder = (useAgent: string) => {
  if (useAgent.includes('Firefox')) {
    return [
      'host',
      'connection',
      'user-agent',
      'accept-language',
      'accept-encoding'
    ]
  } else {
    return [
      'host',
      'connection',
      'user-agent',
      'accept-encoding',
      'accept-language'
    ]
  }
}

const headers_order_check = (req: any, res: any, next: any) => {
  const useAgent = req.headers['user-agent']

  if (!useAgent) {
    return
  }

  const standardOrder = getStandardOrder(useAgent)
  const isPass = check(standardOrder, Object.keys(req.headers))

  console.log('-'.repeat(50))
  console.log(`Use Agent: ${useAgent}`)
  console.log(`Headers: ${jsonStringify(req.headers)}`)
  console.log(`Standard order: ${jsonStringify(standardOrder)}`)
  console.log(`Is Pass: ${isPass}`)
  console.log('-'.repeat(50))

  if (isPass) {
    next()
  } else {
    res.status(400).send('fail')
  }
}

export default headers_order_check
