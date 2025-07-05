import { FaSpinner } from 'react-icons/fa'
import './Loading.css'

interface Props {
  title?: string
}

const Loading: React.FC<Props> = ({ title = 'Loading...' }) => (
  <div className="loading">
    <FaSpinner className="spin" /> {title}
  </div>
)
export default Loading
