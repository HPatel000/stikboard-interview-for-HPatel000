import React, { Fragment, useState } from 'react'
import Modal from './Modal'

const DashboardData = ({ launchData }) => {
  const [modalData, setModalData] = useState(null)
  return (
    <Fragment>
      {launchData?.map(data => (
        <tr
          key={data.launch_date_utc}
          onClick={() => {
            setModalData(data)
          }}
        >
          <td>{data.flight_number}</td>
          <td>
            {new Date(data.launch_date_utc)
              .toISOString()
              .replace(/T/, ' at ')
              .replace(/\..+/, '')}
          </td>
          <td>{data.launch_site.site_name}</td>
          <td>{data.mission_name}</td>
          <td>{data.rocket.second_stage.payloads[0].orbit}</td>
          {data.upcoming ? (
            <td>
              <small className='badge badge__yellow'>Upcoming</small>
            </td>
          ) : data.launch_success ? (
            <td>
              <small className='badge badge__green'>Success</small>
            </td>
          ) : (
            <td>
              <small className='badge badge__red'>Failed</small>
            </td>
          )}
          <td>{data.rocket.rocket_name}</td>
        </tr>
      ))}
      {modalData && (
        <div
          className={`modal ${
            modalData !== null ? 'modal__show' : 'modal__hide'
          }`}
        >
          <Modal setModalData={setModalData} data={modalData} />
        </div>
      )}
    </Fragment>
  )
}

export default DashboardData
