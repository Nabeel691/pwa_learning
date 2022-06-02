import React, { useContext } from 'react'
import TestContext from '../context/testContext';

const HelloWorld = () => {
    const { username, setUsernameState } = useContext(TestContext);
    setUsernameState('Nabeel in Magebit')
    
  return (
      <>
        {!username && <span>Hello world!</span>}
        {username && <span>Hello, {username}</span>}
      </>
  )
}

export default HelloWorld