import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState("")
    try {
      const response = await axios.get('https://binary-3gfc.onrender.com/data');
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <h1>Welcome to Binary Project</h1>
      <h2>Data from Server: {data}</h2>
    </div>
  )
}

export default App
