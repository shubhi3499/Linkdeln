import React, { useEffect } from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction'
export default function DiscoverPage() {

  const authState = useSelector((state)=>state.auth)
  const dispath = useDispatch();
  useEffect(()=>{
    if(!authState.all_profiles_fetched)
    {
      dispath(getAllUsers())
    }
  },[])
  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Discover</h1>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}
