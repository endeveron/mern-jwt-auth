import React, { useState } from 'react'

import './Auth.css'

import AuthForm from '../../components/AuthForm/AuthForm'
import { useAuthContext } from '../../shared/context/auth-context'
import { useHttp } from '../../shared/hooks/useHttp'

const Auth = () => {
  const [signupMode, setSignupMode] = useState(false)
  const { sendRequest } = useHttp()
  const { login } = useAuthContext()

  const toggleMode = () => {
    setSignupMode(signupMode => !signupMode);
  }

  const sendAuthRequest = async data => {
    const mode = signupMode ? 'signup' : 'login'

    try {
      const resData = await sendRequest(
        `http://localhost:5002/api/user/${ mode }`,
        'POST',
        JSON.stringify(data),
        { 'Content-Type': 'application/json' }
      )
      login(resData.userId, resData.token)

    } catch (err) {
      console.log(err)
    }
  }

  const formDataHandler = data => {
    sendAuthRequest(data)
  }

  return (
    <div className='auth'>
      <AuthForm
        signupMode={ signupMode }
        formSubmitted={ formDataHandler } />

      <div className='auth__mode-toggler'>
        <span onClick={ toggleMode }>
          { signupMode ? 'Already have an account ?' : 'Don\'t have an account ?' }
        </span>
      </div>
    </div>
  );
};

export default Auth;