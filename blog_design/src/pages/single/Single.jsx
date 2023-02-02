
import Sidebar from '../../components/Sidebar/Sidebar'
import Singlepost from '../../components/singePost/Singlepost'
import './single.css'

export default function Single() {
  return (
    <div className='single'>
      <Singlepost/>
      <Sidebar/>
    </div>
  )
}
