"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react"

export const GlobalContext = createContext(null)

export function GlobalState({ children }) {
  const [services, setServices] = useState({data:[],loading:true,error:null});
  const [categories, setCategories] = useState([]);
  const [components, setComponents] = useState([]);
  const [mapings, setMapings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState({data:[],loading:true, error:null});
  const [discount, setDiscount] = useState({
    priceId:'',
    amount:0,
  })

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('/api/auth/users');
        if (res.data.success) {
          setUsers((perv) => ({...perv , data:res.data.data}));
        }
      } catch (error) {
        setUsers((perv) => ({data:null,loading:false,error}));
      }finally{
        setUsers((perv) => ({...perv,loading:false}));
      }
    }
    getAllUsers()
  }, [])
  useEffect(() => {
    const getMapings = async () => {
      try {
        const res = await axios.get('/api/mapings');
        if (res.data.success) {
          setMapings(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getMapings()
  }, [mapings.length])
  useEffect(() => {
    const getComponents = async () => {
      try {
        const res = await axios.get('/api/components');
        if (res.data.success) {
          setComponents(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComponents()
  }, [])
  useEffect(() => {
    const getRoles = async () => {
      try {

        const res = await axios.get('/api/roles');
        if (res.data.success) {
          setRoles(res.data.data)
        }

      } catch (error) {
        console.log(error)
      }
    }
    getRoles()

  }, [])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        if (res.data.success) setCategories(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories();

  }, [])

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get('/api/services');
        if (res.data.success) {
          setServices((prev) => ({...prev, data:res.data?.data}));
        }
      } catch (error) {
        setServices((prev) => ({data:[], loading:false, error:error}));
      }finally{
        setServices((prev) => ({...prev, loading:false}));
      }
    }
    getServices();
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        services,
        setServices,
        categories,
        setCategories,
        roles,
        setRoles,
        components,
        setComponents,
        mapings,
        setMapings,
        discount,
        setDiscount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export function useAppContext() {
  return useContext(GlobalContext);
} 