import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reserveRoom } from '../../redux/reservationSlice';
import { Button, Box, Typography } from '@mui/material';
import CustomInput from '../../components/Input';
import './RoomReservation.css';

const rooms = [
  { id: 1, name: 'GYM', bldng: 'Main Bldng.' },
  { id: 2, name: '201', bldng: 'Main Bldng.' },
  { id: 3, name: '207', bldng: 'Main Bldng.' },
  { id: 4, name: '209', bldng: 'Main Bldng.' },
  { id: 5, name: '147', bldng: 'IT Bldng.' },
  { id: 6, name: '148', bldng: 'IT Bldng.' },
  { id: 7, name: '149', bldng: 'IT Bldng.' },
  { id: 8, name: '154', bldng: 'IT Bldng.' },
  { id: 9, name: '334', bldng: 'IT Bldng.' },
  { id: 10, name: '335', bldng: 'IT Bldng.' },
  { id: 11, name: '336', bldng: 'IT Bldng.' },
  { id: 12, name: '337', bldng: 'IT Bldng.' }
];

const RoomReservation = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userName, setUserName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const dispatch = useDispatch();

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleReserve = () => {
    if (selectedRoom && userName && checkInDate && checkInTime && checkOutTime) {
      const newReservation = { ...selectedRoom, userName, checkInDate, checkInTime, checkOutTime };
      dispatch(reserveRoom(newReservation));
      alert(`Room reserved: ${selectedRoom.name}`);
      setSelectedRoom(null);
      setUserName('');
      setCheckInDate('');
      setCheckInTime('');
      setCheckOutTime('');
    } else {
      alert('Please fill in all fields before reserving.');
    }
  };

  const mainBuildingRooms = rooms.filter(room => room.bldng === 'Main Bldng.');
  const itBuildingRooms = rooms.filter(room => room.bldng === 'IT Bldng.');

  return (
    <div className="reservation-container">
      <Typography variant='h3' component='div' style={{ color: 'dark gray', paddingBottom: '1rem' }}>
        MFI Polytechnic Institute Inc.
      </Typography>
      <Typography variant='h5' component='div' style={{ paddingBottom: '1rem' }}>
        Main Building Rooms
      </Typography>
      <div className="room-buttons">
        {mainBuildingRooms.map((room) => (
          <button key={room.id} className="room-button" onClick={() => handleRoomSelect(room)}>
            {room.name}
          </button>
        ))}
      </div>
      <Typography variant='h5' component='div' style={{ paddingBottom: '1rem' }}>
        IT Building Rooms
      </Typography>
      <div className="room-buttons">
        {itBuildingRooms.map((room) => (
          <button key={room.id} className="room-button" onClick={() => handleRoomSelect(room)}>
            {room.name}
          </button>
        ))}
      </div>
      {selectedRoom && (
        <div className="reservation-summary">
          <Box component='div'>
            <Typography variant='h6' component='div' style={{ paddingBottom: '10px' }}>
              You have selected: {selectedRoom.name} - {selectedRoom.bldng}
            </Typography>
            <div className="custom-input">
              <label htmlFor="userName">Your Name</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="custom-input">
              <label htmlFor="checkInDate">Check-In Date</label>
              <input
                id="checkInDate"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="custom-input">
              <label htmlFor="checkInTime">Check-In Time</label>
              <input
                id="checkInTime"
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
              />
            </div>
            <div className="custom-input">
              <label htmlFor="checkOutTime">Check-Out Time</label>
              <input
                id="checkOutTime"
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color = 'info'
              className="confirm-button"
              onClick={handleReserve}
              
            >
              Confirm Reservation
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default RoomReservation;
