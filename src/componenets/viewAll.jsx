import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./movie-card";
import { CircularProgress } from "@mui/material";
import './movie.css'
import './section.scss'
import Pagination from './pagination';



const ViewAll = () => {
    const {category} = useParams()
    const [currentMovies, setCurrentMovies] = useState([])
    const [totalPages, setTotalPages] = useState('')
    const [totalResults, setTotalResults] = useState('')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    let popular = `https://api.themoviedb.org/3/movie/popular?api_key=0c67b96606a1f9095e44781655ac394f&language=en-US&page=${page}`
    let trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=0c67b96606a1f9095e44781655ac394f&page=${page}`
    let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=0c67b96606a1f9095e44781655ac394f&language=en-US&page=${page}`
    let upComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=0c67b96606a1f9095e44781655ac394f&language=en-US&page=${page}`
    let topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=0c67b96606a1f9095e44781655ac394f&language=en-US&page=${page}`
    
    const setUrl = () => {
        if(category === 'popular') return popular
        else if(category === 'trending') return trending
        else if(category === 'now playing') return nowPlaying
        else if(category === 'upcoming') return upComing
        else if(category === 'top rated') return topRated
    }
    const getCurrentMovies = async() => {
        const response = await fetch(setUrl(), {
            method : 'GET',
        });
        const data = await response.json()
        setCurrentMovies(data.results)
        setTotalResults(data.total_results)
        setTotalPages(data.total_pages)
        setLoading(false)
    }
    useEffect(()=>{
        getCurrentMovies()
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [page])
    return(
        <div className="view-all">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <p>{`Total results found '${totalResults}'`}</p>
            {loading ? (
                    <div className="loader section">
                        <CircularProgress />
                    </div>
                    ) : <div className="cont">
                        {
                            currentMovies.map((movie)=>(
                                <MovieCard key={movie.id} movie={movie}/>
                            ))
                        }
                </div>
            }
            <Pagination totalPages={totalPages} setPage={setPage} page={page}/>
        </div>
    )
}


export default ViewAll