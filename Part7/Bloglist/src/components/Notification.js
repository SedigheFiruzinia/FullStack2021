import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  // if (message === null) {
  //   return null
  // } else {

  //   return (
  //     <div className={message.type}>
  //       {message.text}
  //     </div>
  //   )

  // }
  const msg = useSelector(msg => msg.Notification)
  return(
    <div>
      { msg && <div className={msg.style}>
        {msg.message}
      </div>
      }
    </div>
  )
}
export default Notification