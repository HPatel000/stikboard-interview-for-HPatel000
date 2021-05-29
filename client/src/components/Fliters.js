import React, { useContext, useState } from 'react'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'

const Fliters = ({ setLaunchData }) => {
  const { loading, setloading } = useContext(GlobalContext)

  const [dropdown, setDropdown] = useState(false)
  const [dropdownTitle, setDropdownTitle] = useState('All Launches')

  const getAllLaunches = async () => {
    setloading(true)

    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    setLaunchData(res.data)
    setDropdownTitle('All Launches')
    setDropdown(false)

    setloading(false)
  }
  const getUpcomingLaunches = async () => {
    setloading(true)

    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/upcoming'
    )
    setLaunchData(res.data)
    setDropdownTitle('Upcoming Launches')
    setDropdown(false)

    setloading(false)
  }
  const getSuccessfulLaunches = async () => {
    setloading(true)

    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/?launch_success=true'
    )
    setLaunchData(res.data)
    setDropdownTitle('Successful Launches')
    setDropdown(false)

    setloading(false)
  }
  const getFailedLaunches = async () => {
    setloading(true)

    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/?launch_success=false'
    )
    setLaunchData(res.data)
    setDropdownTitle('Failed Launches')
    setDropdown(false)

    setloading(false)
  }
  return (
    <div className='fliters'>
      <div className='fliters__item'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.333 1.99996H13.9997C14.1765 1.99996 14.3461 2.0702 14.4711 2.19522C14.5961 2.32025 14.6663 2.48981 14.6663 2.66663V13.3333C14.6663 13.5101 14.5961 13.6797 14.4711 13.8047C14.3461 13.9297 14.1765 14 13.9997 14H1.99967C1.82286 14 1.65329 13.9297 1.52827 13.8047C1.40325 13.6797 1.33301 13.5101 1.33301 13.3333V2.66663C1.33301 2.48981 1.40325 2.32025 1.52827 2.19522C1.65329 2.0702 1.82286 1.99996 1.99967 1.99996H4.66634V0.666626H5.99967V1.99996H9.99967V0.666626H11.333V1.99996ZM9.99967 3.33329H5.99967V4.66663H4.66634V3.33329H2.66634V5.99996H13.333V3.33329H11.333V4.66663H9.99967V3.33329ZM13.333 7.33329H2.66634V12.6666H13.333V7.33329Z'
            fill='#4B5563'
          />
        </svg>
        <p>Past 6 Months</p>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.99999 8.78135L11.3 5.48135L12.2427 6.42402L7.99999 10.6667L3.75732 6.42402L4.69999 5.48135L7.99999 8.78135Z'
            fill='#4B5563'
          />
        </svg>
      </div>
      <div className='fliters__item'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14 2.66666V3.99999H13.3333L10 8.99999V14.6667H6V8.99999L2.66667 3.99999H2V2.66666H14ZM4.26933 3.99999L7.33333 8.59599V13.3333H8.66667V8.59599L11.7307 3.99999H4.26933Z'
            fill='#4B5563'
          />
        </svg>
        <p>{dropdownTitle}</p>
        <div className='dropdown'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => {
              setDropdown(!dropdown)
            }}
          >
            <path
              d='M7.99999 8.78135L11.3 5.48135L12.2427 6.42402L7.99999 10.6667L3.75732 6.42402L4.69999 5.48135L7.99999 8.78135Z'
              fill='#4B5563'
            />
          </svg>
          <div
            className={`dropdown__content ${dropdown ? 'dropdown__show' : ''}`}
          >
            <button onClick={() => getAllLaunches()}>All Launches</button>
            <button onClick={() => getUpcomingLaunches()}>
              Upcoming Launches
            </button>
            <button onClick={() => getSuccessfulLaunches()}>
              Successful Launches
            </button>
            <button onClick={() => getFailedLaunches()}>Failed Launches</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fliters
