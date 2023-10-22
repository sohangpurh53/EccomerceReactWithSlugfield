import React, { useEffect, useState } from 'react'
import '../css/notification.css'

const Notfication = ({message}) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (message){
            setShow(true);
            setTimeout(()=> setShow(false), 2000)
        }

    }, [message])
  return (
    <div className={`notification ${show ? 'show' : 'hide'}`}>
      {message}
    </div>
  )
}

export default Notfication