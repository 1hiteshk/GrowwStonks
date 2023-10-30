"use client"
import { Provider } from "react-redux"
import store from "./store"
import { ThemeProvider } from "next-themes"
// provider creates a layer around of redux to use over next js application
// to make a layer we use Provider, provider ke under nextjs k sare comp. as children pass kr diye
// store={store} to use the data stored in redux in whole next js app
export function Providers({children}){
    return <Provider store={store}>
        <ThemeProvider attribute="class">
         {children}
         </ThemeProvider>
        </Provider>
}

// redux data flow is uni directional