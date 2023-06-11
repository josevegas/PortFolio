import style from './NavBar.module.css';
import anagrama from '../../Images/anagrama-model.png'
import { Link } from 'react-router-dom';

export default function NavBar(){
    return(
        <div className={style.divNavBar}>
            <div className={style.imageNavBar}><img src={anagrama} alt='not found' height='100px' /></div>
            <div className={style.componentNavBar}><Link to='/home' className={style.linkNavBar}><h1>Home</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/aboutme' className={style.linkNavBar}><h1>Sobre Mi</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/proyects' className={style.linkNavBar}><h1>Proyectos</h1></Link></div>
            <div className={style.componentNavBar}><Link to='/mail' className={style.linkNavBar}><h1>Contacto</h1></Link></div>
        </div>
    )
}