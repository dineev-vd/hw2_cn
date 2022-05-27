import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import './ProjectPage.css'
import TabLink from './TabLink';
import HotelsComponent from './HotelsComponent';
import { Api } from './api';
import { useEffect, useState } from 'react';
import RoomComponent from './RoomComponent';
import BookingComponent from './BookingComponent';

function App() {
  const [api, setApi] = useState<Api>(new Api());

  return <div className="project-page">
        <div className="project-page_nav">
            <TabLink to={'hotels'}>Hotels</TabLink>
            <TabLink to={'rooms'}>Rooms</TabLink>
            <TabLink to={'book'}>Booking</TabLink>
        </div>
        <div className="project-page_content">
            <Routes>
                <Route path="hotels" element={<HotelsComponent api={api}/>} />
                <Route path='rooms' element={<RoomComponent api={api}/>} />
                <Route path="book" element={<BookingComponent api={api}/>} />
                <Route index element={<Navigate to={"hotels"} replace />} />
            </Routes>
        </div>
    </div>
}

export default App;
