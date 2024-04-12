export const getEncryptParams = () => {
  const time = Date.now() + ''
  const sum = time.split('').reduce((acc, cur) => acc + parseInt(cur), 0)
  return {
    time,
    sum
  }
}

export const caesarCipherEncrypt = (text: string, iv: number) => {
  let result = ''
  for (let i of text) {
    result += String.fromCharCode(i.charCodeAt(0) + iv)
  }
  return result
}
