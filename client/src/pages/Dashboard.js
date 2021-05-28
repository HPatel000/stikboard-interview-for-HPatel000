import React, { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'

const Dashboard = props => {
  const { user } = useContext(GlobalContext)
  useEffect(() => {
    if (!user) {
      props.history.push('/signin')
    }
  }, [user])
  return <div>Dashboard</div>
}

export default Dashboard
