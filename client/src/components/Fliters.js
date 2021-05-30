import React, { useContext, useState } from 'react'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import CalenderIcon from './CalenderIcon'
import DownarrowIcon from './DownarrowIcon'
import FilterIcon from './FilterIcon'

const Fliters = ({ setLaunchData }) => {
  const { setloading } = useContext(GlobalContext)

  const [dropdown, setDropdown] = useState(false)
  const [dropdownTitle, setDropdownTitle] = useState('All Launches')

  const [datepicker, setDatepicker] = useState(false)
  const [datepickerTitle, setDatepickerTitle] = useState('Past 6 Months')

  const setDefaults = data => {
    setLaunchData(data)
    setDropdown(false)
    setloading(false)
  }

  const getAllLaunches = async () => {
    setloading(true)
    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    setDropdownTitle('All Launches')
    setDefaults(res.data)
  }

  const getUpcomingLaunches = async () => {
    setloading(true)
    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/upcoming'
    )
    setDropdownTitle('Upcoming Launches')
    setDefaults(res.data)
  }

  const getSuccessfulLaunches = async () => {
    setloading(true)
    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/?launch_success=true'
    )
    setDropdownTitle('Successful Launches')
    setDefaults(res.data)
  }

  const getFailedLaunches = async () => {
    setloading(true)
    const res = await axios.get(
      'https://api.spacexdata.com/v3/launches/?launch_success=false'
    )
    setDropdownTitle('Failed Launches')
    setDefaults(res.data)
  }

  const getLaunchDataByDuration = async month => {
    const end = new Date()
    const start = new Date()
    start.setMonth(end.getMonth() - month)
    setloading(true)
    const res = await axios.get(
      `https://api.spacexdata.com/v3/launches/?start=${start}&end=${end}`
    )
    setDatepickerTitle(`Past ${month < 1 ? 'week' : `${month} months`} `)
    setDefaults(res.data)
  }

  return (
    <div className='fliters'>
      {/* dropdown for duration */}
      <div
        className='fliters__item'
        onClick={() => {
          setDatepicker(!datepicker)
        }}
      >
        <CalenderIcon />
        <p>{datepickerTitle}</p>
        <DownarrowIcon />
        <div className='dropdown'>
          <div
            className={`dropdown__content ${
              datepicker ? 'dropdown__show' : ''
            }`}
          >
            <button onClick={() => getLaunchDataByDuration(0.25)}>
              Past Week
            </button>
            <button onClick={() => getLaunchDataByDuration(3)}>
              Past 3 Months
            </button>
            <button onClick={() => getLaunchDataByDuration(6)}>
              Past 6 Months
            </button>
            <button onClick={() => getLaunchDataByDuration(12)}>
              Past Year
            </button>
            <button onClick={() => getLaunchDataByDuration(24)}>
              Past 2 Years
            </button>
          </div>
        </div>
      </div>

      {/* dropdown for launch type */}
      <div
        className='fliters__item'
        onClick={() => {
          setDropdown(!dropdown)
        }}
      >
        <FilterIcon />
        <p>{dropdownTitle}</p>
        <DownarrowIcon />
        <div className='dropdown'>
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
