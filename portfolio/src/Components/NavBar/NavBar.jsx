import style from './NavBar.module.css';
import anagrama from '../../Images/anagrama-model.png'

export default function NavBar(){
    return(
        <div className={style.divNavBar}>
            <div><img src={anagrama} alt='not found' height='100px' /></div>
        </div>
    )
}