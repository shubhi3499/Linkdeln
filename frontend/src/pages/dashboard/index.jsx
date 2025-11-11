import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';

function dashboard() {

  const [isTokenThere,setisTokenThere] = useState(false);
    const router = useRouter();
    const dispath = useDispatch();
    useEffect(()=>{
        if(localStorage.getItem('token')===null)
        {
            router.push("/login");
        }
        setisTokenThere(true);
    })

    useEffect(()=>
    {
      if(isTokenThere){
        dispath(getAllPosts())
        dispath(getAboutUser({token:localStorage.getItem('token')}))
      }
    },[isTokenThere])
  return (
    <div>
      dashboard
    </div>
  )
}

export default dashboard;
