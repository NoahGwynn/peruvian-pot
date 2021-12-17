import React, {useEffect, useRef} from 'react';
import useOnScreen from "../hooks/useOnScreen";

function ImOnScreen({setOnScreenState: [onScreen, setOnScreen]}) {

    const ref = useRef()
    const isVisible = useOnScreen(ref)

    useEffect(() => {
        if (onScreen !== isVisible) setOnScreen(isVisible)
    }, [isVisible])

    return <div ref={ref} className={"text-center prime-colour py-4"}/>
}

export default ImOnScreen;