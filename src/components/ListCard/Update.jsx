import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"
import Loading from "@/components/Loading"

const Update = () => {
    const { data, loading } = getAnimeResponse("manhwa-new")
    if (loading) {
        return <Loading />
    }
    
    return (
        <div className="p-2">
            <span className="py-2 text-2xl font-extrabold">Komik Terbaru</span>
            <div className="grid grid-cols-3 gap-2 py-2">
                {data.slice(0,21).map((komik,index) => (
                    <NavLink
                        className="relative bg-cover bg-center inner-shadow-bottom w-full h-36 md:h-56 rounded-sm cursor-pointer overflow-hidden"
                        style={{backgroundImage: `url(${komik.imageSrc.split("?resize")[0]})` }}
                        to={`/komik/${komik.link.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-blue-600 text-xs font-bold rounded-br-xl px-2 py-1">
                            {komik.chapters?.[0]?.chapterTitle 
                                ? `Ch. ${komik.chapters[0].chapterTitle.replace("Ch.", "")}` 
                                : "Ch. Error"}
                        </span>
                        <span className="absolute bottom-0 text-sm font-bold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Update