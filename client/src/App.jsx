import Navbar from './scenes/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='app bg-white dark:text-white dark:bg-black'>
      <Navbar />
      <div className='py-4 pb-10 pt-16 px-[6%] dark:bg-black'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
