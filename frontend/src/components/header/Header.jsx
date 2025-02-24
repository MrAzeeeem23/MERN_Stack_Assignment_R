import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <nav className='bg-amber-300 py-3'>
            <Link to={'/table'} className="p-2 text-white">Table</Link>
            <Link to={'/graph'} className="p-2 text-white">Graph</Link>
            <Link to={'/pie'} className="p-2 text-white">Pie</Link>
            <Link to={'/totalSales'} className="p-2 text-white">TotalSales</Link>
        </nav>
    </div>
  )
}

export default Header