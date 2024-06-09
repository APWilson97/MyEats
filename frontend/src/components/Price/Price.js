import React from 'react'

export default function Price({price, locale='en-uk', currency='GBP'}) {
const formatPrice = () => 
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(price);

  return (
    <span>{formatPrice()}</span>
  )
}

// Price.defaultProps = {
//     locale: 'en-UK',
//     currency: 'GBP'
// }