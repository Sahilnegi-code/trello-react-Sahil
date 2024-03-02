import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Project from './Project'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <ChakraProvider>
             {/* <Modal/>  */}
            <Project/>
          </ChakraProvider>
  
    </>
  )
}

export default App
