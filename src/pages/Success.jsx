import { ScaleLoader } from "react-spinners"
import { useEffect, useState } from 'react'
const success = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center gap-2 mt-10 min-h-[100vh]" >
                        <ScaleLoader />
                    </div>
                ) : (
                    <div className='container flex justify-center min-h-[100vh] items-center'>
                        <p className="text-xl">order successful ! </p>
                    </div>)
            }



        </>

    )

}

export default success