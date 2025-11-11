import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserLayout from '@/layout/UserLayout';
import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';

export default function Dashboard() {
  const [isTokenThere, setIsTokenThere] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Check for token on mount
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      router.push('/login');
    } else {
      setIsTokenThere(true);
    }
  }, []);

  // Fetch data when token is present
  useEffect(() => {
    if (isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: localStorage.getItem('token') }));
    }
  }, [isTokenThere, dispatch]);

  return (
    <UserLayout>
      {authState?.profileFetched && (
        <div style={{ padding: '20px' }}>
          Hey {authState.user?.userId?.name}
        </div>
      )}
    </UserLayout>
  );
}
