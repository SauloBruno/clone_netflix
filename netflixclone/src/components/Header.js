import React from "react";
import './Header.css';


export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="Header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" />
                </a>
            </div>
            <div className="Header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}









