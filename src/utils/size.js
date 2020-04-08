function JudgeSize(size) {
  let newSize
  if (size < 1048576) newSize = (size / 1024).toFixed(2) + 'KB'
  else if (size === 1048576) newSize = '1MB'
  else if (size > 1048576 && size < 1073741824)
    newSize = (size / 1024 / 1024).toFixed(2) + 'MB'
  else if (size === 1073741824) newSize = '1GB'

  return newSize
}
export default JudgeSize
