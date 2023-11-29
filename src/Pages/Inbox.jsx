import {useEffect} from 'react'

export default function Inbox() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div>Inbox</div>
  )
}
