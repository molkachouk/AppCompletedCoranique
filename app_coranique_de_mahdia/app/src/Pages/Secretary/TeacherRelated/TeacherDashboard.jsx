import React from 'react';
import Logout from '../../Logout';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  return (
    <div>
      <p>Welcome, Teacher</p>
      <Link to="/logout">Logout</Link>
    </div>
  );
}