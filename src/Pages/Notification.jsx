import {useEffect} from 'react'

export default function Notification() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div>Notification</div>
  )
}
