import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing({setAccess}){
    const handleClick=(e)=>{
        return setAccess(true);
    }
    return(
        <div className={style.bodyL}>
            <Link to='/home'><button className={style.ButtonL} onClick={e=>handleClick(e)}>Ingresar</button></Link>
        </div>
    )
}