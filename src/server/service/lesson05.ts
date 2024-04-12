// token: 时间戳校验和

export default function (req: any, res: any, next: any) {
  const params = req.query || {}
  const token = params.token

  console.log(`[lesson05] Token: ${token}`)

  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  const tokens = token.split('|')
  const time = tokens[0]
  const sum = tokens[1]

  console.log(`[lesson05] Time: ${time}, Sum: ${sum}`)

  const checkSum = time.split('').reduce((acc: number, curr: string) => {
    return acc + parseInt(curr)
  }, 0)

  console.log(`[lesson05] Sum: ${sum}, Checksum: ${checkSum}`)

  if (sum != checkSum) {
    return res.status(401).send('Unauthorized')
  }

  res.send('Authorized')
}
