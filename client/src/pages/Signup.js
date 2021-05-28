import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { Link } from 'react-router-dom'

const Signup = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userSignup, user, error } = useContext(GlobalContext)

  const fromSubmitted = async e => {
    e.preventDefault()
    userSignup(email, password)
  }

  useEffect(() => {
    if (user) {
      props.history.push('/')
    }
  }, [user, error])

  return (
    <div className='form__page'>
      <h1>Sign Up</h1>
      {error && <p className='form_error'>{error}</p>}
      <form onSubmit={fromSubmitted}>
        <label htmlFor='email'>Email</label>
        <input
          className='form__input'
          type='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <p></p>
        <br />
        <label htmlFor='password'>Password</label>
        <input
          className='form__input'
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength='6'
          required
        />
        <p></p>
        <br />
        <button className='submit__btn' type='submit'>
          Sign Up
        </button>
      </form>
      <p>Already have an account?</p>
      <Link className='redirectlink' to='/signin'>
        Sign In
      </Link>
    </div>
  )
}

export default Signup
