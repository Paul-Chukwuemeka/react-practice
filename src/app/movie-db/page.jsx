'use client'

import Header from "./components/header"
import Main from "./components/main"
import Footer from "./components/footer"
import AppContext from "@/contexts/contexts"
import { useContext, useEffect } from "react"
import useFetchData from "@/hooks/usefetchData"

const Page = () => {
  const {darkMode} = useContext(AppContext)

useEffect(()=>{
async function getData(){
    const test  = await useFetchData()
    console.log(test)
}
getData()
},[])

  return (
    <div className={`${darkMode ? "" :"bg-gray-100 text-gray-900"} flex flex-col h-fit min-h-screen `}>
    <Header/>
    <Main/>
    <Footer/>
    </div>
  )
}

export default Page