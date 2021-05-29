import React, { Fragment, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'
import Modal from '../components/Modal'
import ReactPaginate from 'react-paginate'
import Fliters from '../components/Fliters'
import Loader from '../components/Loader'

const Dashboard = props => {
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [launchData, setLaunchData] = useState('')

  const [offset, setOffset] = useState(1)
  const [pageData, setPageData] = useState([])
  const [perPage] = useState(10)
  const [pageCount, setPageCount] = useState(0)

  const { user, loading, setloading } = useContext(GlobalContext)

  const getLaunchData = async () => {
    setloading(true)
    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    setLaunchData(res.data)
    setloading(false)
  }

  const getData = async () => {
    const slice = launchData?.slice(
      (offset - 1) * 10,
      (offset - 1) * 10 + perPage
    )
    let postData = null
    if (slice.length === 0) {
      postData = (
        <tr>
          <td colSpan='7'>
            <p>No results found for specified filter.</p>
          </td>
        </tr>
      )
    } else {
      postData = slice?.map(data => (
        <tr
          key={data.launch_date_utc}
          onClick={() => {
            setModalShow(true)
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
          ) : !data.launch_success ? (
            <td>
              <small className='badge badge__red'>Failed</small>
            </td>
          ) : (
            <td>
              <small className='badge badge__green'>Success</small>
            </td>
          )}
          <td>{data.rocket.rocket_name}</td>
        </tr>
      ))
    }
    setPageData(postData)
    setPageCount(Math.ceil(launchData.length / perPage))
  }

  const handlePageClick = e => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
  }

  useEffect(() => {
    if (!user) {
      props.history.push('/signin')
    } else {
      getLaunchData()
    }
  }, [user])

  useEffect(() => {
    if (launchData) {
      getData()
    }
  }, [offset, launchData])

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
              <Fragment>{pageData}</Fragment>
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
        {modalData && (
          <div className={`modal ${modalShow ? 'modal__show' : 'modal__hide'}`}>
            <Modal
              setModalData={setModalData}
              setModalShow={setModalShow}
              data={modalData}
            />
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Dashboard
