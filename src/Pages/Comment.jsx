import { useEffect } from 'react'

export default function Comment() {

  useEffect(()=>{
      window.scrollTo(0, 0);
  },[])

  return (
    <div>Comment</div>
  )
}
