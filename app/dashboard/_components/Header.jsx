import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
        <Image src={'/logo.svg'} width={40} height={50} alt="Squid"/>

    </div>
  )
}

export default Header