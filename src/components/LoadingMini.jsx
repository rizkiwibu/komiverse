import gif from "@/assets/loading.gif"

const LoadingMini = () => {
    return (
        <div className="flex items-center justify-center p-2">
            <div className="flex flex-col items-center justify-center">
                <img className="w-32" src={gif} alt="Loading" />
                <h1 className="font-medium">Loading....</h1>
            </div>
        </div>
    )
}

export default LoadingMini