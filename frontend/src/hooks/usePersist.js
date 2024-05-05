import { useState, useEffect } from "react";

const usePersist = () => {
    const [persist, setPersisit] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])


    return [persist, setPersisit]
}

export default usePersist