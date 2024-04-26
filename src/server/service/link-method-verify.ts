// link method 校验

export default function (req: any, res: any, next: any) {
  console.log(`[link method verify] trigger`)

  res.send('Authorized')
}
