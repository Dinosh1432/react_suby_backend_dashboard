import React from 'react'

const Sidebar = ({showFirmHandler,showProductHandler,showAllProductHandler,showFirmTitle}) => {
  return (
    <div className='sideBarSection'>
        <ul>
            {showFirmTitle?<li onClick={showFirmHandler}>Add Firm</li>:"" }

            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showAllProductHandler}>All Product</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar