import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserLayout from '@/layout/UserLayout';
import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import DashboardLayout from '@/layout/DashboardLayout';

export default function Dashboard() {
  const [isTokenThere, setIsTokenThere] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if(authState.isTokenThere)
    {
      dispatch(getAllPosts())
      dispatch(getAboutUser({token:localStorage.getItem('token')}))
    }
  })

  return(
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Dashboard</h1>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
