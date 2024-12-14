import { NavLink,useNavigate,useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import getAnimeResponse from "@/libs/api-libs"
import { FaPaperPlane,FaBookmark,FaTrash,FaArrowLeft,FaStar,FaCircleArrowLeft,FaCircleArrowRight,FaReadme } from "react-icons/fa6"
import { MdBookmarkAdd,MdBookmarkAdded,MdBookmarkRemove } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import Loading from "@/components/Loading"

const KomikDetail = () => {
    const [isBookmark, setIsBookmark] = useState(false)
    const navigate = useNavigate()
    const { komik } = useParams()
    
    useEffect(() => {
        if (data) {
            const checkBookmark = JSON.parse(localStorage.getItem("bookmarkKomik")) || []
            const isBookmarked = checkBookmark.some((komik) => komik.title === data.title)
            setIsBookmark(isBookmarked)
        }
    }, [])
    
    const { data, loading } = getAnimeResponse(`manhwa-detail/${komik}`)
    if (loading) {
        return <Loading />
    }
    
    const genre = data?.genres.map(genre => genre.genreName).join(", ")
    const angka = parseInt(data?.followedBy.match(/\d+/)?.[0] || 0)
    
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    const handleBookmark = () => {
        const bookmarkKomik = JSON.parse(localStorage.getItem("bookmarkKomik")) || []
        if (isBookmark) {
            const removeBookmark = bookmarkKomik.filter(komik => komik.title !== data.title)
            localStorage.setItem("bookmarkKomik", JSON.stringify(removeBookmark))
            setIsBookmark(false)
        } else {
            const updatedData = { ...data, link: komik }
            console.log(updatedData)
            bookmarkKomik.push(updatedData)
            localStorage.setItem("bookmarkKomik", JSON.stringify(bookmarkKomik))
            setIsBookmark(true)
        }
    }
    
    const shareUrl = () => {
        const shareData = {
            title: "Bagikan Komik Ini",
            text: `Ayo ajak temanmu untuk baca komik ini : ${window.location.href}`,
        }

        if (navigator.share) {
            try {
                navigator.share(shareData)
                console.log("Berhasil dibagikan!")
            } catch (error) {
                console.error("Gagal membagikan:", error)
            }
        } else navigator.clipboard.writeText(link)
    }
    
    return (
        <div>
            <div className="relative flex flex-col items-center justify-center gap-3 px-2 pt-10 pb-2">
                <img className="absolute top-0 w-screen h-52 blur-2xl" src={data.imageSrc} />
                <button className="absolute top-2 left-3" onClick={() => navigate(-1)} >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div className="w-1/3">
                    <img className="relative bg-cover bg-center w-full h-40 rounded-lg overflow-hidden" src={data.imageSrc} alt="" />
                </div>
                <span className="relative text-3xl font-extrabold line-clamp-2">{data.title.replace("Bahasa Indonesia","")}</span>
            </div>
            <div className="flex items-center gap-1 pl-3 pb-3">
                <IoMdEye className="text-sm" />
                <span className="text-xs">{data.followedBy.replace("Diikuti", "Dibaca")}</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap scroll-page px-2 py-1">
                <div className="text-sm bg-[#212121] px-3 py-1 rounded-full">{data.released}</div>
                <div className="text-sm bg-[#212121] px-3 py-1 rounded-full">{data.author}</div>
                <div className="text-sm bg-[#212121] px-3 py-1 rounded-full">{data.artist}</div>
                <div className="flex items-center gap-1 text-sm bg-[#212121] px-3 py-1 rounded-full">
                    <FaStar className="text-sm text-yellow-300" />
                    <span className="text-sm">{data.rating}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap scroll-page px-2 py-1">
                {data.genres.map((genre, index) => (
                    <div className="text-sm bg-[#212121] px-3.5 py-1 rounded-full" key={index}>
                        {genre.genreName}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 px-7 py-4">
                {isBookmark ? 
                    <button
                        className="flex items-center gap-4 bg-[#212121] hover:bg-[#171717] w-1/2 text-white p-3 rounded-full"
                        onClick={handleBookmark}
                    >
                        <FaTrash className="text-xl text-blue-600" />
                        <span className="text-lg text-white font-semibold">Remove</span>
                    </button>
                :
                    <button
                        className="flex items-center gap-4 bg-[#212121] hover:bg-[#171717] w-1/2 text-white p-3 rounded-full"
                        onClick={handleBookmark}
                    >
                        <FaBookmark className="text-xl text-blue-600" />
                        <span className="text-lg text-white font-semibold">Bookmark</span>
                    </button>
                }
                <button
                    onClick={shareUrl}
                    className="flex items-center gap-4 bg-[#212121] hover:bg-[#171717] w-1/2 text-white px-3 py-3 rounded-full "
                >
                    <FaPaperPlane className="text-xl text-blue-600" />
                    <span className="text-lg font-semibold">Bagikan</span>
                </button>
            </div>
            <p className="text-sm px-3">{data.synopsis}</p>
            <div className="flex items-center justify-center gap-2 px-2 py-4">
                <div className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 p-3 rounded-full">
                    <FaCircleArrowLeft className="" />
                    <span className="text-lg font-bold">
                        {data.firstChapter.title === "?" ? data.firstChapter.title : "Chapter 0"}
                    </span>
                </div>
                <div className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 p-3 rounded-full">
                    <span className="text-lg font-bold">{data.latestChapter.title}</span>
                    <FaCircleArrowRight className="" />
                </div>
            </div>
            <div className="container max-h-[600px] flex flex-col overflow-y-auto gap-3 rounded-md p-2">
                {data.chapters.map((chapter, index) => {
                    const randomNumber = getRandomNumber(1, angka)
                    return (
                        <div 
                            className="mt-1"
                            key={index}
                        >
                            <div className="flex items-center gap-1 pb-1 pl-1">
                                <IoMdEye className="text-sm" />
                                <span className="text-xs">{randomNumber}</span>
                            </div>
                            <NavLink 
                                className="flex items-center justify-between bg-[#212121] px-4 py-3 rounded-bl-3xl rounded-tr-3xl"
                                to={`/chapter/${chapter.chapterLink.split("/")[3]}`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold">{chapter.chapterNum}</span>
                                    <span className="text-sm">{chapter.chapterDate}</span>
                                </div>
                                <FaReadme className="text-3xl" />
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default KomikDetail