import React from 'react'
import Logout from '../../Logout'

function StudentDashboard() {
  return (
    <div>
      welcome student
      <Route path="/logout" element={<Logout/>} />
    </div>
  )
}

export default StudentDashboard