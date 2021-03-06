export const appRoot = document.getElementById('app-root')

const numberFormat = new Intl.NumberFormat('id-ID', { style: 'decimal', maximumFractionDigits: 2 })
export const formatNumber = (num) => {
  const number = Number(num)
  return numberFormat.format(number)
}

export const categoryIconName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(' ', '_')
    .replace(' ', '')
}
