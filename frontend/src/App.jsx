import React from 'react'
import { Outlet } from 'react-router-dom'
import Graph from './components/Graph'
import PieChart from './components/PieChart'
// import TransactionDashboard from './components/TransactionDashboard'

function App() {
  return (
    <Outlet />
    // <TransactionDashboard />
    // <Graph />
    // <PieChart />
  )
}

export default App