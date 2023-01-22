import style from './header.module.sass'
import mountains from './mountains.jpg'

const Header = () => {
    return (
        <header>
            <h2>ADMIN</h2>
            <img src={mountains} alt="" />
            <button>Войти</button>
        </header>
    );
};

export default Header;