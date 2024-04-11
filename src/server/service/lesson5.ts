// token: 时间戳校验和

export default function (req: any, res: any, next: any) {
  const params = req.query || {}
  const token = params.token

  console.log(`[lesson5] Token: ${token}`)

  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  const tokens = token.split('|')
  const time = tokens[0]
  const sum = tokens[1]

  console.log(`[lesson5] Time: ${time}, Sum: ${sum}`)

  const checkSum = time.split('').reduce((acc: number, curr: string) => {
    return acc + parseInt(curr)
  }, 0)

  console.log(`[lesson5] Sum: ${sum}, Checksum: ${checkSum}`)

  if (sum != checkSum) {
    return res.status(401).send('Unauthorized')
  }

  res.send('Lesson 5 is completed')
}
