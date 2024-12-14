import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import ViewAll from "@/components/ViewAll"

const SearchKomik = () => {
    const [ searchAnime, setSearchAnime ] = useState(false)
    const [ inputAnime, setInputAnime ] = useState("")
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            setSearchAnime(!searchAnime)
        }
    }
    
    return (
        <div className="p-2">
            <div className="flex items-center justify-center">
                <span className="text-2xl font-extrabold">Pencarian</span>
            </div>
            <div className="">
                <label className="relative block mx-1 my-4 bg-[#212121] border border-gray-800 rounded-lg">
                    <div className="flex items-center absolute rounded-l-lg inset-y-0 left-0 pl-2">
                        <FaSearch className="" />
                    </div>
                    <input className="bg-[#212121] border-none block w-full rounded-lg pl-8 py-2 placeholder-sm focus:outline-none"
                        placeholder="Cari Anime Disini..."
                        onChange={(e) => setInputAnime(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </label>
            </div>
            {searchAnime && <ViewAll url={`search/${inputAnime}`} />}
        </div>
    )
}

export default SearchKomik