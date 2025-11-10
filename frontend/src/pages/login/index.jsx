import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(false); 
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  // Redirect if logged in
  useEffect(() => {
    if (authState.loggedIn) {
      router.push('/dashboard');
    }
  }, [authState.loggedIn, router]);

  // Clear message when switching between modes
  useEffect(() => {
    if (authState.emptyMessage) {
      dispatch(emptyMessage);
    }
  }, [isLoginMode]); 

  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
      router.push("/dashboard")
    }
  })

  // Handle Register
  const handleRegister = () => {
    console.log('REGISTERING...');
    dispatch(registerUser({ username, password, email, name }));
  };

  // Handle Login
  const handleLogin = () => {
    console.log('LOGGING IN...');
    dispatch(loginUser({ email, password }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {/* LEFT SIDE - Form */}
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}>
              {isLoginMode ? 'Sign In' : 'Sign Up'}
            </p>

            {/* Display Message */}
            {authState.message && (
              <p style={{ color: authState.isError ? 'red' : 'green' }}>
                {authState.message.message}
              </p>
            )}

            <div className={styles.inputContainer}>
              {/* Extra Fields only for Sign Up */}
              {!isLoginMode && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Name"
                  />
                </div>
              )}

              <input
                onChange={(e) => setEmailAddress(e.target.value)}
                className={styles.inputField}
                type="text"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />

              {/* Submit Button */}
              <div
                onClick={() => {
                  if (isLoginMode) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.buttonWithOutline}
              >
                <p>{isLoginMode ? 'Sign In' : 'Sign Up'}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Toggle */}
          <div className={styles.cardContainer_right}>
            <div>
              {isLoginMode ? (
                <p>Don’t have an account?</p>
              ) : (
                <p>Already have an account?</p>
              )}
              <div
                onClick={() => setIsLoginMode(!isLoginMode)}
                style={{ color: 'black' }}
                className={styles.buttonWithOutline}
              >
                <p>{isLoginMode ? 'Sign Up' : 'Sign In'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;
