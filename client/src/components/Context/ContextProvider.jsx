import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState({});
    const contextValue = { isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn };
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context };
export default ContextProvider;
