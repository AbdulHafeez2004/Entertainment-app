import './movie.css'
import '../App.scss'
import { useNavigate } from "react-router-dom";
const TvCard = ({movie}) => {
    const navigate = useNavigate()
    let releaseDate = movie.release_date || movie.first_air_date
    let title = movie.title || movie.name
    let type = movie.type || movie.media_type
    
    movie.first_air_date ? type = 'Tv series' : type = 'movie'

    return (
        <button className="movie" onClick={()=>{
            navigate(`/tv/${movie.id}`)
        }}>
            <div>
                <img src={movie.poster_path !== null? `https://image.tmdb.org/t/p/original${movie.poster_path}`: "https://via.placeholder.com/400"} alt={movie.Title}/>
            </div>
            <div>
                <span>{releaseDate.slice(0,4)}</span> <span>{type}</span>
                <p>{title.length > 24 ? title.slice(0,24) + "..." : title}</p>
            </div>
      </button>
    )
}

export default TvCard