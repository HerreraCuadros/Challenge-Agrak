import { FC } from 'react';
import { Outlet } from 'react-router';
import './App.css'

export const UserApp: FC = () => {

  return (
    <div>
      <h1> UserApp </h1>
      <Outlet/>
    </div>
  )
}

