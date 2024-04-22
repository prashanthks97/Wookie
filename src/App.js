import React, { useEffect, useState } from 'react';
import { Input, Modal, Spin } from 'antd';
import moment from 'moment';

import './App.css';

const App = () => {
    const [movieData, setMovieData] = useState({});
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInput] = useState('');

    useEffect(() => {
        fetch('https://wookie.codesubmit.io/movies', {
            method: 'GET',
            headers: { Authorization: 'Bearer Wookie2019' },
        })
            .then(response => response.json())
            .then(data => setMovieData(data));
    }, []);

    const { movies } = movieData;

    let genres = [];
    if (movies) {
        movies.forEach(item => {
            item.genres.forEach(data => {
                if (!genres.includes(data)) {
                    genres = [
                        ...genres,
                        data
                    ];
                }
            })
        })
    };

    const handleSelectMovie = (value) => {
        setSelectedMovie([value]);
        setIsVisible(true);
    };

    const handleClosePopup = () => {
        setSelectedMovie([]);
        setIsVisible(false);
        setInput('');
    };

    const handleChangeInput = (e) => {
        if (e?.target?.value) {
            const filteredData = movies?.filter(item => item.title.toLowerCase()?.includes(e.target.value.toLowerCase()));
            if (filteredData?.length) {
                setSelectedMovie(filteredData);
                setIsVisible(true);
                setInput(e.target.value);
            } else {
                // setSelectedMovie([]);
                setIsVisible(false);
                setInput('');
            }
        }
    }

    return (
        <div className="App">
            <div className='title-bar'>
                <div className='red dot'></div>
                <div className='yellow dot'></div>
                <div className='green dot'></div>
            </div>
            <div className='header-section'>
                <div>
                    <div>WOOKIE</div>
                    <div>MOVIES</div>
                </div>
                <div className='d-flex align-items-center'>
                    <img src={process.env.PUBLIC_URL + '/images/search-icon.png'} alt='search-icon' className='search-icon' />
                    <Input onChange={handleChangeInput} value={inputValue}/>
                </div>
            </div>
            {!movieData || !movies
                ? <Spin size='large' />
                : <div>
                    {genres.map((item, index) => {
                        return <div className='info-section' key={index}>
                            <div className='header'>Genre ({item})</div>
                            <div className='d-flex flex-props'>
                                {movies.map((data, key) => {
                                    if (data?.genres?.includes(item)) {
                                        return <div className='box-wrapper' onClick={() => handleSelectMovie(data)} key={key}>
                                            <div className='box' style={{ backgroundImage: `url(${data.backdrop})` }}></div>
                                            <div className='box-content'>
                                                <div>{data.title} <span>({data.classification})</span></div>
                                                <div className='imdb-area'>IMDB - {data.imdb_rating}</div>
                                            </div>
                                        </div>
                                    } else {
                                        return null;
                                    }
                                })
                                }
                            </div>
                        </div>
                    })
                    }
                </div>
            }
            <Modal
                visible={isVisible}
                onCancel={handleClosePopup}
                footer={null}
            >
                <div>
                    {console.log('selectedMovie', selectedMovie)}
                    {selectedMovie.map((item, key) => {
                        console.log("item", item)
                        return <div key={key} className="modal-wrapper">
                            <img src={item?.poster} alt='poster-img' className='poster-image' />
                            <div className='popup-contents'>
                                <div><b>Slug:</b> {item?.slug}</div>
                                <div className='d-flex'>
                                    <div><b>Cast:</b> {item?.cast?.map((item, key) => {
                                        return <span key={key}>{item}, </span>
                                    })}</div>
                                </div>
                                <div className='d-flex'>
                                    <div><b>Genres:</b> {item?.genres?.map((item, key) => {
                                        return <span key={key}>{item}, </span>
                                    })}</div>
                                </div>
                                <div><b>Director:</b> {item?.director}</div>
                                <div><b>Released Date:</b> {moment(item?.released_on).format('MM/DD/YYYY')}</div>
                                <div><b>Length:</b> {item?.length}</div>
                                <div><b>IMDB:</b> {item?.imdb_rating}</div>
                                <div><b>Overview:</b> {item?.overview}</div>
                            </div>
                        </div>
                    })
                    }
                </div>
            </Modal>
        </div>
    );
}

export default App;
