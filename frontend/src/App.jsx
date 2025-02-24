import React from 'react'
import { Outlet } from 'react-router-dom'
import Graph from './components/Graph'
import Header from './components/header/Header'
import PieChart from './components/PieChart'
// import TransactionDashboard from './components/TransactionDashboard'

function App() {
  return (
    <>
    <Header />
    <Outlet />
    </>
    
  )
}

export default App