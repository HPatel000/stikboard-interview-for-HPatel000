import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userSignup } = useContext(GlobalContext)

  const fromSubmitted = async e => {
    e.preventDefault()
    userSignup(email, password)
  }
  return (
    <div className='form__page'>
      <h1>Sign Up</h1>
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
    </div>
  )
}

export default Signup
