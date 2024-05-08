import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import HomePage from './scenes/homePage/HomePage.jsx';
import LoginPage from './scenes/loginPage/LoginPage.jsx';
import ProfilePage from './scenes/profilePage/ProfilePage.jsx';
import authReducer from './state/authSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import About from './scenes/aboutPage/About.jsx';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<LoginPageWrapper />} />
      <Route path='home' element={<HomePageWrapper />} />
      <Route path='profile/:userId' element={<ProfilePageWrapper />} />
      <Route path='/about' element={<AboutPageWrapper />} />
    </Route>
  )
);

function ProfilePageWrapper() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <ProfilePage /> : <Navigate to='/' />;
}
function HomePageWrapper() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <HomePage /> : <Navigate to='/' />;
}
function LoginPageWrapper() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <Navigate to='/home' /> : <LoginPage />;
}
function AboutPageWrapper() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <About /> : <Navigate to='/' />;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
