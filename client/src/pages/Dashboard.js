import React, { Fragment, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'

const Dashboard = props => {
  const [launchData, setLaunchData] = useState('')

  const getLaunchData = async () => {
    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    console.log(res.data)
    setLaunchData(res.data)
  }

  const { user } = useContext(GlobalContext)
  useEffect(() => {
    if (!user) {
      props.history.push('/signin')
    } else {
      getLaunchData()
    }
  }, [user])
  // no: flight_number
  // utc: launch_data_utc
  // location: data.launch_site.site_name
  // mission: mission_name
  // orbit: second_stage.orbit
  // launch_status: launch_success(true/false), upcoming(true/false)
  // rocket: rocket.rocket_name
  return (
    <Fragment>
      <Header />
      <table>
        <tr>
          <th>No</th>
          <th>Launched (UTC)</th>
          <th>Location</th>
          <th>Mission</th>
          <th>Orbit</th>
          <th>Launch Status</th>
          <th>Rocket</th>
        </tr>
        {launchData &&
          launchData?.map(data => (
            <tr>
              <td>{data.flight_number}</td>
              <td>{data.launch_date_utc}</td>
              <td>{data.launch_site.site_name}</td>
              <td>{data.mission_name}</td>
              <td>{data.rocket.second_stage.payloads[0].orbit}</td>
              {data.upcoming ? (
                <td>Upcoming</td>
              ) : !data.launch_success ? (
                <td>Failed</td>
              ) : (
                <td>Success</td>
              )}
              <td>{data.rocket.rocket_name}</td>
            </tr>
          ))}
      </table>
    </Fragment>
  )
}

export default Dashboard
