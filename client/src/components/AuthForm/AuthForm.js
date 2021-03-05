import React from 'react'

import './AuthForm.css'

import { useForm } from '../../shared/hooks/useForm'

const AuthForm = props => {
  const { signupMode } = props

  const { inputValues, inputChangeHandler } = useForm({
    email: '',
    password: ''
  })

  const submitHandler = e => {
    e.preventDefault();
    const outputData = {
      email: inputValues.email,
      password: inputValues.password
    }
    props.formSubmitted(outputData)
  }

  return (
    <form className='auth-form' onSubmit={ submitHandler } autoComplete="off" >
      <label>
        <input
          name='email'
          type='email'
          className='auth-form__input'
          value={ inputValues.email }
          onChange={ inputChangeHandler }
          placeholder='Email'
          required />
      </label>

      <label>
        <input
          name='password'
          type='password'
          className='auth-form__input'
          value={ inputValues.password }
          onChange={ inputChangeHandler }
          placeholder='Password'
          required />
      </label>

      <div className='auth-form__buttons-wrapper'>
        <button type='submit'>
          { signupMode ? 'signup' : 'login' }
        </button>
      </div>
    </form>
  )
}

export default AuthForm