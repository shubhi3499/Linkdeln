import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { loginUser, registerUser } from '@/config/redux/action/authAction';

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispath = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email,setEmailAddress] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [name,setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push('/dashboard');
    }
  }, [authState.loggedIn]);

  const handleRegister = () =>{
    console.log("REGISTERING...")
    dispath(registerUser({username,password,email,name}))
  }
  return (
    <UserLayout>
      <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer_left}>
          <p className={styles.cardleft_heading}>{isLoginMode ? 'Sign In' : 'Sign Up'}</p>
          <p style={{color:authState.isError ? "red":"green"}}>{authState.message.message}</p>

          <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
              <input onChange={(e)=>setUsername(e.target.value)} className={styles.inputField} type='text' placeholder='username'/>
              <input  onChange={(e)=>setName(e.target.value)} className={styles.inputField} type='text' placeholder='name'/>
            </div>
            <input onChange={(e)=>setEmailAddress(e.target.value)} className={styles.inputField} type='text' placeholder='email'/>
            <input onChange={(e)=>setPassword(e.target.value)} className={styles.inputField} type='text' placeholder='password'/>

            <div onClick={()=>{
              if(isLoginMode)
              {
                handleLogin();

              }else{
                handleRegister();
              }
            }}className={styles.buttonWithOutline}>
              <p>{isLoginMode ? 'Sign In' : 'Sign Up'}</p>
            </div>
            
          </div>
          


        </div>
        <div className={styles.cardContainer_right}>
          {/* Add your form here */}
        </div>
      </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;
