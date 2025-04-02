import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const renderUserMenu = () => {
    if (!userData) return null;

    const menuItems = [
      { label: 'My Profile', path: '/my-profile' },
      { label: 'My Appointments', path: '/my-appointments' }
    ];

    // Add role-specific menu items
    if (userData.role === 'admin') {
      menuItems.push({ label: 'Admin Dashboard', path: '/admin/dashboard' });
    } else if (userData.role === 'doctor') {
      menuItems.push({ label: 'Doctor Dashboard', path: '/doctor/dashboard' });
    }

    menuItems.push({ label: 'Logout', onClick: logout });

    return (
      <div className='flex items-center gap-2 cursor-pointer group relative'>
        <img className='w-8 rounded-full' src={userData.image} alt="" />
        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
          <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
            {menuItems.map((item, index) => (
              <p
                key={index}
                onClick={item.onClick || (() => navigate(item.path))}
                className='hover:text-black cursor-pointer'
              >
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <h1 onClick={() => navigate('/')} className='text-3xl font-bold text-primary cursor-pointer'>DocEasy</h1>
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {token && userData ? renderUserMenu() : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
            Create account
          </button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <h1 className='text-2xl font-bold text-primary'>DocEasy</h1>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            {token && userData && (
              <>
                <NavLink onClick={() => setShowMenu(false)} to='/my-profile'><p className='px-4 py-2 rounded full inline-block'>MY PROFILE</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/my-appointments'><p className='px-4 py-2 rounded full inline-block'>MY APPOINTMENTS</p></NavLink>
                {userData.role === 'admin' && (
                  <NavLink onClick={() => setShowMenu(false)} to='/admin/dashboard'><p className='px-4 py-2 rounded full inline-block'>ADMIN DASHBOARD</p></NavLink>
                )}
                {userData.role === 'doctor' && (
                  <NavLink onClick={() => setShowMenu(false)} to='/doctor/dashboard'><p className='px-4 py-2 rounded full inline-block'>DOCTOR DASHBOARD</p></NavLink>
                )}
                <p onClick={() => { setShowMenu(false); logout(); }} className='px-4 py-2 rounded full inline-block cursor-pointer'>LOGOUT</p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
