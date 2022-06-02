import React, { useContext } from 'react'
import TestContext from '../context/testContext';

const HelloWorld = () => {
    const { username, setUsernameState } = useContext(TestContext);
    setUsernameState('')
    
  return (
      <>
        {!username && <span>Hello world!, {HELLO_WORLD}</span>}
        {username && <span>Hello, {username}</span>}
      </>
  )
}

export default HelloWorld