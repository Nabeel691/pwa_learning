import React, { useContext } from 'react'
import TestContext from '../context/testContext';
import classes from './helloWorldContainer.module.css';

const HelloWorld = () => {
    const { username, setUsernameState } = useContext(TestContext);
    setUsernameState('Nabeel in Magebit')
    
  return (
      <div className={classes.helloWorld}>
        {!username && <span>Hello world!, {HELLO_WORLD}</span>}
        {username && <span>Hello, {username}</span>}
      </div>
  )
}

export default HelloWorld