import Banner from '@/components/atom/Banner'
import Blog from '@/components/atom/Blog'
import MemberPlan from '@/components/atom/MemberPlan'
import React from 'react'
import Service from '../service/page'
import Contact from '../contact/page'
import AdvanceFilter from '@/components/atom/AdvanceFilter'
function Home() {
  return (<>
      <Banner />
      <AdvanceFilter />
      <Service />
      <MemberPlan />
      <Blog />
      <Contact />
  </>)
}

export default Home