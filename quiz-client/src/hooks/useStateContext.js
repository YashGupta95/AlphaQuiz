import React, { createContext, useState, useContext, useEffect } from 'react'

export const stateContext = createContext();

const getFreshContext = () => {
    //the values inside Context API gets lost once the page is refreshed, so we are using localStorage to preserve the data
    if(localStorage.getItem('context') === null)
        localStorage.setItem('context', JSON.stringify({
            participantId: 0,
            timeTaken: 0,
            selectedOptions: []
        }))

    return JSON.parse(localStorage.getItem('context'))
}

export default function useStateContext() {
    const { context, setContext } = useContext(stateContext)
    return {
        context,
        setContext: obj => { setContext({ ...context, ...obj }) },
        resetContext: () => {
          localStorage.removeItem('context')
          setContext(getFreshContext())
        }
    };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());
  
  //update the data stored in localStorage if the context values get updated
  useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])

  return (
    <stateContext.Provider value={{context, setContext}}>
        {children}
    </stateContext.Provider>
  )
}
