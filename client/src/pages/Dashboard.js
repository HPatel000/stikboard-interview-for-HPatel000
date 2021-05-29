import React, { Fragment, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'
import Modal from '../components/Modal'
import ReactPaginate from 'react-paginate'
import Fliters from '../components/Fliters'

const Dashboard = props => {
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [launchData, setLaunchData] = useState('')

  const [offset, setOffset] = useState(1)
  const [pageData, setPageData] = useState([])
  const [perPage] = useState(10)
  const [pageCount, setPageCount] = useState(0)

  const { user } = useContext(GlobalContext)

  const getLaunchData = async () => {
    const res = await axios.get('https://api.spacexdata.com/v3/launches')
    setLaunchData(res.data)
  }

  const getData = async () => {
    const pageData = launchData
    const slice = pageData?.slice(
      (offset - 1) * 10,
      (offset - 1) * 10 + perPage
    )
    // console.log(slice)
    const postData = slice?.map(data => (
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
    setPageData(postData)
    setPageCount(Math.ceil(pageData.length / perPage))
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
          <tbody>{pageData}</tbody>
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

// TODO: loading and empty state

export default Dashboard
