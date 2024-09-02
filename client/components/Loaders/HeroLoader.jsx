import React from 'react'
import { BarLoader } from 'react-spinners'

const HeroLoader = () => {
  return (
    <div className='w-full h-full bg-blue-950 fixed top-0 flex justify-center items-center  flex-col gap-2 z-50'>
       <h1 className='animate-bounce text-white text-4xl font-semibold'>Vaahan Bazar</h1>
       <BarLoader height={4} width={150} color='white'/>
    </div>
  )
}

export default HeroLoader