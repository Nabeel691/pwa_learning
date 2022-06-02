import React, { createContext, useState } from "react";

const TestContext = createContext();

export const TestProvider = ({children}) => {
    const [username, setUsername] = useState('');

    const setUsernameState = (username) => {
        setUsername(username);
    }

    return (
        <TestContext.Provider value={{ username, setUsernameState }}>{children}</TestContext.Provider>
    )
}

export default TestContext;