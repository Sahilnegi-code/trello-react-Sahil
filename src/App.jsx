import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Project from './Project'
import {Provider} from 'react-redux';
import store from './Store/store'
function App() {

  return (
    <>
    <Provider store={ store }>
    <ChakraProvider>
      <Project/>
    </ChakraProvider>
  
    </Provider>
      
    </>
  )
}

export default App
