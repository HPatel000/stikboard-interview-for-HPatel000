import React, { Fragment, useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'
import Header from '../components/Header'
import ReactPaginate from 'react-paginate'
import Fliters from '../components/Fliters'
import Loader from '../components/Loader'
import DashboardData from '../components/DashboardData'

const Dashboard = props => {
  const [launchData, setLaunchData] = useState('')

  const [offset, setOffset] = useState(1)
  const [pageData, setPageData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const perPage = 10

  const { user, loading, setloading } = useContext(GlobalContext)

  // if user is logged in then launch data will be fetched
  useEffect(() => {
    if (!user) {
      props.history.push('/signin')
    } else {
      getLaunchData()
    }
  }, [user])

  // pagination will done on launch data
  useEffect(() => {
    if (launchData) {
      getData()
    }
  }, [offset, launchData])

  // getting all launches data
  const getLaunchData = async () => {
    setloading(true)
    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    setLaunchData(res.data)
    setloading(false)
  }

  // pagination and data will be rendered using map
  const getData = async () => {
    const slice = launchData?.slice(
      (offset - 1) * 10,
      (offset - 1) * 10 + perPage
    )
    setPageData(slice)
    setPageCount(Math.ceil(launchData.length / perPage))
  }

  const handlePageClick = e => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
  }

  return (
    <Fragment>
      <Header />
      <div className='dashboard'>
        <Fliters setLaunchData={setLaunchData} />
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Launched (UTC)</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Launch Status</th>
              <th>Rocket</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan='7'>
                  <Loader />
                </td>
              </tr>
            ) : (
              <Fragment>
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan='7'>
                      <p className='empty__data'>
                        No results found for specified filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  <DashboardData launchData={pageData} />
                )}
              </Fragment>
            )}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'. . .'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </Fragment>
  )
}

export default Dashboard
