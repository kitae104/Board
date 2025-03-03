export const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  // const options = { 
  //   year: 'numeric', 
  //   month: '2-digit', 
  //   day: '2-digit', 
  //   hour: '2-digit', 
  //   minute: '2-digit', 
  //   second: '2-digit',
  //   hour12: true,
  //   timeZone: 'Asia/Seoul'
  // }  
  // return date.toLocaleString('ko-KR', options)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  return `${year}년 ${month}월 ${day}일 `
}

export const byteToUnit = (byte) => {
  const unitMultiple = {
    'B': 1, 
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024, 
    'TB': 1024 * 1024 * 1024 * 1024
  }
  let unit = ""
  for(const key in unitMultiple) {
    if(byte >= unitMultiple[key]) {
      unit = key     
    }
  }
  // 환산
  const size = byte / unitMultiple[unit]    
  return `${size.toFixed(2)} ${unit}`
}