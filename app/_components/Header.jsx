import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-md'>
        <Image src={'/logo.svg'} width={40} height={50} alt="Squid"/>
        <Button> Get Started </Button>
    </div>
  )
}

export default Header