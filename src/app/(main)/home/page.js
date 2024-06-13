import Banner from '@/components/atom/Banner'
import Blog from '@/components/atom/Blog'
import HomeC1 from '@/components/atom/HomeC1'
import MemberPlan from '@/components/atom/MemberPlan'
import React from 'react'
function Home() {
  return (<>
      {/* <HomeC1/> */}
      <Banner/>
      <MemberPlan/>
      <Blog/>

  </>)
}

export default Home