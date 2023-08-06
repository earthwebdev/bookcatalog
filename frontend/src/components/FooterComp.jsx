import React from 'react'

const FooterComp = () => {
  let todaydates = new Date();
  let year = todaydates.getFullYear();

  return (
    <footer className='bg-gradient-to-r from-blue-300 to-blue-800 py-6'>
      <div className="container mx-auto text-white text-center">
          { year } Copyright All right reserved.
      </div>

    </footer>
  )
}

export default FooterComp