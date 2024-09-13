import './App.css'
import Header from './components/Header'
import ToDo from './components/ToDo'
import { AuthProvider } from '../src/contexts/AuthContext';


function App() {

  return (
    <AuthProvider>
      <div className='flex justify-center'>
        <div className='container rounded p-4 bg-[#C75B7A]'>
          <Header />
          <ToDo />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
