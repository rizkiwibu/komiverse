import gif from "@/assets/loading.gif"

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <img className="w-32" src={gif} alt="Loading" />
                <h1 className="font-medium">Loading....</h1>
            </div>
        </div>
    )
}

export default Loading