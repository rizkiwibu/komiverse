import { NavLink } from "react-router-dom"

const GenreList = () => {
    const genreList = [{"label":"Action","value":"action"},{"label":"Adventure","value":"adventure"},{"label":"Comedy","value":"comedy"},{"label":"Doujinshi","value":"doujinshi"},{"label":"Drama","value":"drama"},{"label":"Ecchi","value":"ecchi"},{"label":"Fantasy","value":"fantasy"},{"label":"Gender Bender","value":"gender-bender"},{"label":"Harem","value":"harem"},{"label":"Historical","value":"historical"},{"label":"Horror","value":"horror"},{"label":"Isekai","value":"isekai"},{"label":"Josei","value":"josei"},{"label":"Lolicon","value":"lolicon"},{"label":"Martial Arts","value":"martial-arts"},{"label":"Mature","value":"mature"},{"label":"Mecha","value":"mecha"},{"label":"Mystery","value":"mystery"},{"label":"Oneshot","value":"oneshot"},{"label":"Psychological","value":"psychological"},{"label":"Romance","value":"romance"},{"label":"School Life","value":"school-life"},{"label":"Sci-fi","value":"sci-fi"},{"label":"Seinen","value":"seinen"},{"label":"Shotacon","value":"shotacon"},{"label":"Shoujo","value":"shoujo"},{"label":"Shoujo Ai","value":"shoujo-ai"},{"label":"Shounen","value":"shounen"},{"label":"Shounen Ai","value":"shounen-ai"},{"label":"Slice of Life","value":"slice-of-life"},{"label":"Sports","value":"sports"},{"label":"Supernatural","value":"supernatural"},{"label":"Tragedy","value":"tragedy"},{"label":"Yaoi","value":"yaoi"},{"label":"Yuri","value":"yuri"}]
    return (
        <div className="py-2">
            <span className="p-2 text-2xl font-extrabold">Daftar Genre</span>
            <div className="flex flex-wrap items-center gap-2 px-2">
                {genreList.map((genreName,index) => (
                    <NavLink
                        className="bg-[#212121] px-3 py-1 rounded-full"
                        to={`/genres/${genreName.value}`}
                        key={index}
                    >
                        <span className="text-sm">{genreName.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default GenreList
