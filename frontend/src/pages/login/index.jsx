import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push('/dashboard');
    }
  }, [authState.loggedIn]);

  return (
    <UserLayout>
      <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer_left}>
          <p className={styles.cardleft_heading}>{isLoginMode ? 'Sign In' : 'Sign Up'}</p>

          <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
              <input className={styles.inputField} type='text' placeholder='username'/>
              <input className={styles.inputField} type='text' placeholder='name'/>
            </div>
            <input className={styles.inputField} type='text' placeholder='email'/>
            <input className={styles.inputField} type='text' placeholder='password'/>

            <div className={styles.buttonWithOutline}>
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
