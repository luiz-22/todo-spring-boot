import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import GoogleLogo from '../assets/GoogleLogo';
import GitHubLogo from '../assets/GitHubLogo';

function Header() {
    const { user, handleLogout, googleLogin, githubLogin } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div>
            {user ? (
                <div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#F4D9D0]'>Hola, {user.name}</p>
                        <div className="relative">
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer"
                                src={user.image}
                                alt="User Profile"
                                referrerPolicy="no-referrer"
                                onClick={toggleMenu}
                            />
                            {menuOpen && (
                                <div className="absolute right-0 w-24 bg-white border rounded shadow-lg">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center block w-full px-4 py-2 text-left text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex justify-end'>
                    <button className='flex items-center justify-center mr-2 opacity-50 hover:border-transparent' onClick={googleLogin} disabled>
                        <GoogleLogo />
                        &nbsp;Login
                    </button>
                    <button className='flex items-center justify-center' onClick={githubLogin}>
                        <GitHubLogo />
                        &nbsp;Login
                    </button>
                </div>
            )}
            <h1 className='my-8 text-4xl text-[#921A40]'>Todo App</h1>
        </div>
    );
}

export default Header;
