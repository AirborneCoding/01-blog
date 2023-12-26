import { useState, useRef } from 'react'
import '@/styles/navbar.css'
import { BsList } from '@/assets/icons/index'
import NavSearch from './NavSearch'
import NavLinks from './NavLinks'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Info from './Info'
// import "./header.css"

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  // links
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }
  const linkStyles = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : '0px',
  }

  return (
    <nav>
      <div className='mx-auto body-container'>

        <div className='nav-center'>

          <div className='nav-header'>
            <ul className='flex space-x-4'>
              <li className="flex items-center space-x-5">
                <Link to="/" className="text-black pt-4">
                  <h2 className="text-xl md:text-3xl font-bold ">
                    <span className="bg-gray-800 text-white px-1 rounded-md shadow-lg mr-0.5" >Air</span>borne
                  </h2>
                </Link>

                <NavSearch />

              </li>
            </ul>


            <div className='flex md:hidden'>
              <Info
                user={user}
              />
            </div>
            <button className='nav-toggle' onClick={toggleLinks}>
              <BsList className='text-4xl text-blog transition duration-500 ease-in-out' />
            </button>

          </div>

          <div
            className='links-container'
            ref={linksContainerRef}
            style={linkStyles}
          >
            <ul className='links' ref={linksRef}>
              <NavLinks setShowLinks={setShowLinks} />
              <li className=''>
                <Info
                  user={user}
                />
              </li>
            </ul>
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar