import style from './NavBar.module.css';
import anagrama from '../../Images/anagrama-model.png'
import { Link } from 'react-router-dom';

export default function NavBar({setAccess}){
    const handleClick=(e)=>{
        return setAccess(false);
    }
    return(
        <div className={style.divNavBar}>
            <div className={style.imageNavBar}><img src={anagrama} alt='not found' height='100px' /></div>
            <div className={style.componentNavBar}><Link to='/home' className={style.linkNavBar}><h1>Home</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/aboutme' className={style.linkNavBar}><h1>Sobre Mi</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/proyects' className={style.linkNavBar}><h1>Proyectos</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/mailme' className={style.linkNavBar}><h1>Contacto</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/'><button className={style.buttonNavBar} onClick={e=>handleClick(e)}>Inicio</button></Link></div>
        </div>
    )
}