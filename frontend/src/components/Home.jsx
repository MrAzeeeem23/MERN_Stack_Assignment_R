import React from 'react'
import axios from 'axios'

function Home() {

  const test = async () => {
    await axios.get('http://localhost:3000/')
  }

  test()

  return (
    <div>Home</div>
  )
}

export default Home