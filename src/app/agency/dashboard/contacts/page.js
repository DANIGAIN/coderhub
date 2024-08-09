'use client'
import Breadcrumb from '@/components/Breadcrumbs';
import DefaultLayout from '@/components/dashboardLayout';
import Contructs from '@/components/list/contruct/indax';
import { useAppContext } from '@/context';
import React from 'react'

export default function ContactPage() {
  const {contacts ,setContacts} = useAppContext();
  return (
      <div>
          <DefaultLayout>
              <Breadcrumb pageName="Querys" />
               <Contructs contacts={contacts} setContacts={setContacts}/>
          </DefaultLayout>
      </div>
  )
}
