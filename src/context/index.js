"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

export const GlobalContext = createContext(null)

export function GlobalState({ children }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [roles , setRoles] = useState([]);
  useEffect(()=>{
    const getRoles = async()=>{
      try{

        const res = await axios.get('/api/roles');
        if(res.data.success){
          setRoles(res.data.data)
        }

      }catch(error){
        console.log(error)
      }
    }
    getRoles()

  },[])
 
  useEffect(()=>{
    const getCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        if (res.data.success) setCategories(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories();

  },[])

  useEffect(() => { 
    const getServices = async () => {
      try {
        const res = await axios.get('/api/services');
        if (res.data.success) {
          setServices(res.data?.data);
        }
  
      } catch (error) {
        console.log(error)
      }
    }
    getServices(); 
  
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        services,
        setServices,
        categories,
        setCategories,
        roles ,
        setRoles
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export function useAppContext() {
  return useContext(GlobalContext);
} 