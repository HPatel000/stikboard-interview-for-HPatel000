import React from 'react'

const Modal = ({ setModalShow, setModalData, data }) => {
  console.log(data)
  return (
    <div className='modal__content'>
      <button
        className='modal__close'
        onClick={() => {
          setModalShow(false)
          setModalData(null)
        }}
      >
        &times;
      </button>
      <div className='modal__header'>
        <img src={data.links.mission_patch_small} alt='Mission Patch' />
        <div>
          <h3>{data.mission_name}</h3>
          <p>{data.rocket.rocket_name}</p>
        </div>
        {data.upcoming ? (
          <p>
            <small className='badge badge__yellow'>Upcoming</small>
          </p>
        ) : !data.launch_success ? (
          <p>
            <small className='badge badge__red'>Failed</small>
          </p>
        ) : (
          <p>
            <small className='badge badge__green'>Success</small>
          </p>
        )}
      </div>
      <div className='modal__para'>
        {data.details} {'  '}
        <a href={data.links.wikipedia}>Wikipedia</a>
      </div>
      <div className='modal__info'>
        <div className='modal__info__row'>
          <p>Flight Number</p>
          <p>{data.flight_number}</p>
        </div>
        <div className='modal__info__row'>
          <p>Mission Name</p>
          <p>{data.mission_name}</p>
        </div>
        <div className='modal__info__row'>
          <p>Rocket Type</p>
          <p>{data.rocket.rocket_type}</p>
        </div>
        <div className='modal__info__row'>
          <p>Rocket Name</p>
          <p>{data.rocket.rocket_name}</p>
        </div>
        <div className='modal__info__row'>
          <p>Manufacture</p>
          <p>{data.rocket.second_stage.payloads[0].manufacturer}</p>
        </div>
        <div className='modal__info__row'>
          <p>Nationality</p>
          <p>{data.rocket.second_stage.payloads[0].nationality}</p>
        </div>
        <div className='modal__info__row'>
          <p>Launch Date</p>
          <p>
            {new Date(data.launch_date_utc)
              .toISOString()
              .replace(/T/, ' at ')
              .replace(/\..+/, '')}
          </p>
        </div>
        <div className='modal__info__row'>
          <p>Payload Type</p>
          <p>{data.rocket.second_stage.payloads[0].payload_type}</p>
        </div>
        <div className='modal__info__row'>
          <p>Orbit</p>
          <p>{data.rocket.second_stage.payloads[0].orbit}</p>
        </div>
        <div className='modal__info__row'>
          <p>Launch Site</p>
          <p>{data.launch_site.site_name}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal
