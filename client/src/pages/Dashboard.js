import React, { Fragment, useContext, useEffect } from 'react'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'

const Dashboard = props => {
  const { user } = useContext(GlobalContext)
  useEffect(() => {
    if (!user) {
      props.history.push('/signin')
    }
  }, [user])
  return (
    <Fragment>
      <Header />
    </Fragment>
  )
}

export default Dashboard
