"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react"

export const GlobalContext = createContext(null)

export function GlobalState({ children }) {
 
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [components, setComponents] = useState([]);
  const [mapings, setMapings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const getAllUsers = async () => {
      try {

        const res = await axios.get('/api/auth/users');
        if (res.data.success) {
          setUsers(res.data.data);
        }

      } catch (error) {
        console.log(error)
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
        setMapings
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export function useAppContext() {
  return useContext(GlobalContext);
} 