import React, { useEffect, useState } from 'react'
import {API_KEY, API_URL} from '../../Config';

function LandingPage() {
    
    function getYesterday(){ // YYYYMMDD
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        return year+month+day;
    }

    const yesterday = getYesterday();

    const [Loading, setLoading] = useState(true);
    const [Movies, setMovies] = useState([]);

    useEffect(() => {
        var endpoint = `${API_URL}?key=${API_KEY}&targetDt=${yesterday}`
        fetchMovies(endpoint)
    }, [])

    async function fetchMovies(endpoint) {
        /*const response = await ( await fetch(endpoint)).json();
        console.log(response);
        setMovies(response.boxOfficeResult.dailyBoxOfficeList);
        setLoading(false);*/
        await fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovies([...Movies, ...response.boxOfficeResult.dailyBoxOfficeList])
            setLoading(false);
        })
    }

    return (
        <>
            <div>
                {Loading ? <h1>Loading...</h1> :
                    <div>{Movies.map(movie => 
                    <div key={movie.movieCd}> <h3>{movie.rank}위 : {movie.movieNm}</h3> 
                    <p>누적 관객 수 : {movie.audiAcc}명</p>
                    <p>영화 개봉일 :  ({movie.openDt}) </p>
                </div>)} </div>}
            </div>
            
        </>
    )
}

export default LandingPage
