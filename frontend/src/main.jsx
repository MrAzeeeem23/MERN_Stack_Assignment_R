import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import TransactionDashboard from './components/TransactionDashboard'
import Graph from './components/Graph'
import PieChart from './components/PieChart'
import TotalSales from './components/TotalSales'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/table' element={<TransactionDashboard />} />
      <Route path='/graph' element={<Graph />} />
      <Route path='/pie' element={<PieChart />} />
      <Route path='/totalSales' element={<TotalSales />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
