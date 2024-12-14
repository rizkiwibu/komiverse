import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FaStar } from "react-icons/fa6"

const Bookmark = () => {
    const [dataBookmark, setDataBookmark] = useState([])

    useEffect(() => {
        const bookmarkData = localStorage.getItem('bookmarkKomik')
        if (bookmarkData) {
          const komik = JSON.parse(bookmarkData)
          setDataBookmark(komik)
        }
    }, [])
    
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [])
  
    return (
        <div className="p-2">
            <div className="flex items-center justify-center">
                <span className="text-2xl font-extrabold">Bookmark</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-4">
                {dataBookmark.map((komik,index) => (
                    <NavLink
                        className="relative bg-cover bg-center inner-shadow-bottom w-full h-36 md:h-56 rounded-sm cursor-pointer overflow-hidden"
                        style={{backgroundImage: `url(${komik.imageSrc})` }}
                        to={`/komik/${komik.link}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-blue-600 text-xs font-bold rounded-br-xl px-2 py-1">Ch. {komik.latestChapter.title.replace("Chapter ","")}</span>
                        <div className="absolute top-[76px] left-0 flex items-center gap-1 p-1">
                            <FaStar className="text-yellow-300 text-xs z-50" />
                            <span className="text-white text-xs font-medium z-50">{komik.rating.slice(0,3)}</span>
                        </div>
                        <span className="absolute bottom-0 text-white text-sm font-semibold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Bookmark
