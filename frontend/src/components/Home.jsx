import React from 'react'
import axios from 'axios'

function Home() {

  const test = async () => {
    await axios.get('http://localhost:3000/')
  }

  test()

  return (
    <div className='max-h-full bg-amber-200'>
      Transaction of Products
    </div>
  )
}

export default Home