export default function (req: any, res: any, next: any) {
  return res.json({
    time: Date.now()
  })
}
