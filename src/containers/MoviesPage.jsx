import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import MovieBox from '../components/MovieCard/MovieCard';
import { getMovies } from '../store/actions/actions';

function Movies({ movies, getMovies }) {
  const fetchMovies = useCallback(() => {
    getMovies();
  }, [getMovies]);

  useEffect(() => {
    console.log('rerenders once 0')
    fetchMovies();
    console.log('rerenders once 1')
  }, [fetchMovies]);

  console.log('rerenders once 2')

  return (
    <div>
      {movies && movies.map(movie => {
        return (
          <MovieBox key={movie.id} movie={movie}/>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ movies }) => {
    return { 
      ...movies,
    }
};

const mapDispatchToProps = dispatch => {
    return {
      getMovies: () => dispatch(getMovies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);