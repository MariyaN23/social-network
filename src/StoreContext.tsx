import React from 'react';

export const StoreContext = React.createContext<any>(null)

type ProviderPropsType = {
    store: any
    children: any
}

export const Provider = (props: ProviderPropsType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}