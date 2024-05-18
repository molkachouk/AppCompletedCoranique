import React from 'react'
import Logout from '../../Logout'

function ParentDashboard() {
  return (
    <div>
      welcome parent
      <Route path="/logout" element={<Logout />} />
    </div>
  )
}

export default ParentDashboard