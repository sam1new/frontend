import MainLayout from '../components/layouts/MainLayout';
import Explore from '../pages/main/Explore';
import RoomReservation from '../pages/main/RoomReservation';
import ReservedRooms from '../pages/main/ReservedRooms';

const MainRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <RoomReservation /> // Set RoomReservation as the home page
      },
      {
        path: 'explore',
        element: <Explore />
      },
      {
        path: 'reservedrooms',
        element: <ReservedRooms />
      }
    ]
  }
];

export default MainRoutes;
