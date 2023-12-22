import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

 const AppLayout = (props) => {
  return (
    <>
     <Header/>

        <div>
        {props.children}
        </div>
    <Footer/>
    </>
  )
}
export default AppLayout;