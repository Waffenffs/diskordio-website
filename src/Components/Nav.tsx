import { SiDiscord } from 'react-icons/si'
import { Link } from 'react-router-dom'

export default function Nav() {
    return(
        <nav className="landingNav">
        <div className="iconBox">
            <SiDiscord className='icon' />
            <h3 className='discordio'>Diskordio</h3>
        </div>
        <div className="links">
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}><span className='link'>About</span></Link>
            <span className='link'>
                <a href='https://github.com/Waffenffs/diskordio-website' target='_blank' style={{ textDecoration: 'none', color: 'inherit'}}>Github</a>
            </span>
        </div>
        <div className="authBox">
            <Link to='/register' className='authLink'>Register</Link>
            <Link to='/login' className='authLink'>Login</Link>
        </div>
    </nav>
    )
}