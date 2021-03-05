import React from 'react'
import { useAuthContext } from '../../shared/context/auth-context';

import './Protected.css'

const Protected = () => {
  const { logout } = useAuthContext()

  const logoutBtnHandler = () => {
    logout()
  }

  return (
    <div className='protected'>
      <h2 className='protected__title'>Signed in</h2>
      <div className='protected__buttons-wrapper'>
        <button onClick={ logoutBtnHandler }>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Protected;