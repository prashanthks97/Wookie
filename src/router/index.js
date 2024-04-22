import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import NotFound from '../containers/NotFound';
import MoviesPage from '../containers/MoviesPage';
import MovieDetail from '../containers/MovieDetails';
import Layout from '../containers/Layout';

const Router = () => (
  <Layout>
    <Routes>
        <Route path='/' element={<Navigate to='/movies' />} />
        <Route path='/movies' element={<MoviesPage/>} pathName='movies'/>
        <Route path='/movie/:slug' element={<MovieDetail/>} pathName='movieDetails'/>
        <Route path='*' element={<NotFound/>} pathName='NotFound'/>
    </Routes>
  </Layout>
)

export default Router