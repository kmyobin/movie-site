import React, { useEffect, useState } from 'react'
import {P_API_URL_DAYBO, P_API_KEY, N_ID_KEY, N_SECRET_KEY} from '../../Config';
import axios from 'axios';

function LandingPage() {
    
    function getYesterday(){ // YYYYMMDD
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));

        var year = yesterday.getFullYear();
        var month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
        var day = ('0' + yesterday.getDate()).slice(-2);

        return year+month+day;
    }

    const yesterday = getYesterday();
    

    const [Loading, setLoading] = useState(true);
    const [Movies, setMovies] = useState([]);
    const [Images, setImages] = useState(null);

    useEffect(() => {
        var endpoint = `${P_API_URL_DAYBO}?key=${P_API_KEY}&targetDt=${yesterday}`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let temps=response.boxOfficeResult.dailyBoxOfficeList;
            console.log(temps);
            setMovies(...[temps]);
            setLoading(false);
            console.log('before');
            console.log(temps[0].movieCd)
            
            /*for(let i = 0; i< temps.length; i++){
                console.log(temps[i].movieCd)
            }*/
            
            console.log('after')

            for(let i=0; i<temps.length; i++){
                getSearchMovie(temps[i].movieCd)
                console.log('after')
            }
           
        })
    }


    function getSearchMovie(key) {
        //const search = key;
        //const {
        //    data:{
              let  items = axios.get(`https://openapi.naver.com/v1/search/movie.json`,
        //    }} = 
            {
                params: {
                    query : key,
                    display : 20
                },
                headers: {
                    'X-Naver-Client-Id': N_ID_KEY,
                    'X-Naver-Client-Secret': N_SECRET_KEY
                }       
            });
            setImages([...items]);
            setLoading(false);
            if(Images!=null)console.log(Images);
            else console.log('error');
        
    }
    
    

    return (
        <>
            <div>
                {Loading ? <h1>Loading...</h1> :
                    <div>{Movies.map(movie => 
                    <div key={movie.movieCd}> <h3>{movie.rank}위 : {movie.movieNm}</h3> 
                    <p>누적 관객 수 : {movie.audiAcc}명</p>
                    <p>영화 개봉일 :  {movie.openDt} </p>
                </div>)} </div>}
            </div>
            
        </>
    )
};

export default LandingPage
