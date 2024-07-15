"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
export const GlobalContext = createContext(null)

export function GlobalState({ children }) {
  const [services, setServices] = useState({ data: [], loading: true, error: null });
  const [categories, setCategories] = useState({ data: [], loading: true, error: null });
  const [components, setComponents] = useState({ data: [], loading: true, error: null });
  const [mapings, setMapings] = useState({ data: [], loading: true, error: null });
  const [roles, setRoles] = useState({ data: [], loading: true, error: null });
  const [users, setUsers] = useState({ data: [], loading: true, error: null });
  const [discount, setDiscount] = useState({ priceId: '', amount: 0 })

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('/api/auth/users');
        if (res.data.success) {
          setUsers((perv) => ({ ...perv, data: res.data.data, loading: false }));
        }
      } catch (error) {
        setUsers((prev) => ({ ...prev, loading: false, error }));
      }
    }
    getAllUsers()
  }, [])
  useEffect(() => {
    const getMapings = async () => {
      try {
        const res = await axios.get('/api/mapings');
        if (res.data.success) {
          setMapings((prev) => ({ ...prev, data: res.data.data, loading: false }))
        }
      } catch (error) {
        console.log(error)
        setMapings((prev) => ({ ...prev, error, loading: false }))
      }
    }
    getMapings()
  }, [])
  useEffect(() => {
    const getComponents = async () => {
      try {
        const res = await axios.get('/api/components');
        if (res.data.success) {
          setComponents((prev) => ({ ...prev, data: res.data.data, loading: false }))
        }
      } catch (error) {
        console.log(error)
        setComponents((prev) => ({ ...prev, error, loading: false }))
      }
    }
    getComponents()
  }, [])
  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await axios.get('/api/roles');
        if (res.data.success) {
          setRoles((perv) => ({ ...perv, data: res.data.data, loading: false }));
        }
      } catch (error) {
        setRoles((prev) => ({ ...prev, error, loading: false }));
      }
    }
    getRoles()
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        if (res.data.success) {
          setCategories((prev) => ({ ...prev, data: res.data.data, loading: false }))
        }
      } catch (error) {
         console.log(error)
         setCategories((prev) => ({ ...prev, error, loading: false }))
      }
    }
    getCategories();
  }, [])

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get('/api/services');
        if (res.data.success) {
          setServices((prev) => ({ ...prev, data: res.data?.data }));
        }
      } catch (error) {
        setServices((prev) => ({ data: [], loading: false, error: error }));
      } finally {
        setServices((prev) => ({ ...prev, loading: false }));
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