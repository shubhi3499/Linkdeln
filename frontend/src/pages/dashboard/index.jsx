import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserLayout from '@/layout/UserLayout';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from "./index.module.css";
import { BASE_URL } from '@/config';

export default function Dashboard() {
  const [isTokenThere, setIsTokenThere] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if(authState.isTokenThere)
    {
      console.log("Auth Token")
      dispatch(getAllPosts())
      dispatch(getAboutUser({token:localStorage.getItem('token')}))
    }
    if(!authState.all_profiles_fetched)
      {
        dispatch(getAllUsers())
      }
  },[authState.isTokenThere])



  return(
    <UserLayout>
      <DashboardLayout>
        <div className="scrollComponent">
          <div className={styles.createPostContainer}>
          <img className={styles.userProfile}
              width={100}
              src={
                authState?.user?.userId?.profilePicture
                  ? `${BASE_URL}/${authState.user.userId.profilePicture}`
                  : "/default-profile.png"
              }
          />
          <textarea></textarea>
          <label htmlFor='fileUpload'>
          <div className={styles.fab}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          </label>
          <input type='file' hidden id='fileUpload'/>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
