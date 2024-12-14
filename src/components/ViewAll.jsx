import { NavLink, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import getAnimeResponse from "@/libs/api-libs"
import { FaStar } from "react-icons/fa"
import Loading from "@/components/Loading"

const ViewAll = ({ url }) => {
    const { genre } = useParams()
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [page])
    
    const { data, loading } = getAnimeResponse(`${url}/page/${page}`)
    if (loading) {
        return <Loading />
    }
    
    return (
        <div className="py-2">
            <div className="grid grid-cols-3 gap-2">
                {data.seriesList.map((komik,index) => (
                    <NavLink
                        className="relative bg-cover bg-center inner-shadow-bottom w-full h-36 md:h-56 rounded-sm cursor-pointer overflow-hidden"
                        style={{backgroundImage: `url(${komik.image.split("?resize")[0]})` }}
                        to={`/komik/${komik.url.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-blue-600 text-xs font-bold rounded-br-xl px-2 py-1">Ch. {komik.latestChapter.replace("Chapter","")}</span>
                        <div className="absolute top-[76px] left-0 flex items-center gap-1 p-1">
                            <FaStar className="text-yellow-300 text-xs z-50" />
                            <span className="text-white text-xs font-medium z-50">{komik.rating.slice(0,3)}</span>
                        </div>
                        <span className="absolute bottom-0 text-sm font-bold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 py-4">
                {page === 1 ? null : (
                    <button 
                        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-lg"
                        onClick={() => setPage(page - 1)}
                    >
                        Sebelumnya
                    </button>
                )}
                <h3 className="bg-blue-600 text-white font-medium px-3 py-1 rounded-full">{page}</h3>
                {data.pagination.length > 0 ? (
                    <button 
                        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-lg"
                        onClick={() => setPage(page + 1)}
                    >
                        Selanjutnya
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default ViewAll