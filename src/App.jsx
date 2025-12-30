import { useState } from 'react'
import Layout from '../src/Layout/components/Layout'
import { RouterProvider } from 'react-router-dom'
import router from './Route/Route'




function App() {


  return (
    <>
  
  <RouterProvider  router={router}/>
      
    </>
  )
}

export default App
