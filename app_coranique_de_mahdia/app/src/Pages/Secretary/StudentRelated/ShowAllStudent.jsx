import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

export default function ShowAllStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentsList, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Student List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Prename</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Place of Birth</TableCell>
              <TableCell>Study Level</TableCell>
              <TableCell>Establishment</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Memo Level</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Student CIN</TableCell>
              <TableCell>Father CIN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.prename}</TableCell>
                <TableCell>{student.date_birth}</TableCell>
                <TableCell>{student.place_birth}</TableCell>
                <TableCell>{student.study_level}</TableCell>
                <TableCell>{student.establishment}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.mobile}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.name_group?.name_group}</TableCell>
                <TableCell>{student.memo_level}</TableCell>
                <TableCell>{student.units}</TableCell>
                <TableCell>{student.CIN_student}</TableCell>
                <TableCell>{student.father_CIN?.CIN}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
