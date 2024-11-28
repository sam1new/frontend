import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';
import { updateReservedRoom } from '../../redux/reservationSlice';

const ReservedRooms = () => {
  const reservedRooms = useSelector((state) => state.reservation.reservedRooms);
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditData(reservedRooms[index]);
  };

  const handleSaveClick = (index) => {
    dispatch(updateReservedRoom({ index, updatedRoom: editData }));
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Reserved Rooms
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Room Name</TableCell>
              <TableCell>Check-In Date</TableCell>
              <TableCell>Check-In Time</TableCell>
              <TableCell>Check-Out Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservedRooms.length > 0 ? (
              reservedRooms.map((room, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="userName"
                        value={editData.userName || ''}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      room.userName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="name"
                        value={editData.name || ''}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      `${room.name} - ${room.bldng}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="checkInDate"
                        type="date"
                        value={editData.checkInDate || ''}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      room.checkInDate
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="checkInTime"
                        type="time"
                        value={editData.checkInTime || ''}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      room.checkInTime
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="checkOutTime"
                        type="time"
                        value={editData.checkOutTime || ''}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      room.checkOutTime
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Button variant="contained" color="primary" onClick={() => handleSaveClick(index)}>
                        Save
                      </Button>
                    ) : (
                      <Button variant="contained" color="secondary" onClick={() => handleEditClick(index)}>
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No reserved rooms available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReservedRooms;
