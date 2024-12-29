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
                    <div className="relative group/tooltip">
                        {/* <button className='flex items-center justify-center' onClick={githubLogin}> */}
                        <button className='flex items-center justify-center'>
                            <GitHubLogo />
                            &nbsp;Login
                        </button>
                        <span className="absolute pointer-events-none transition-all opacity-0 z-20 top-full translate-y-0 py-1 px-1.5 text-xs left-1/2 -translate-x-1/2 rounded-md whitespace-nowrap text-gray-200 bg-gray-800 dark:bg-white dark:text-gray-700 before:content-[''] before:absolute before:bg-gray-800 before:rounded-sm before:w-2.5 before:rotate-45 before:h-2.5 before:-top-1 before:-z-10 before:left-1/2 before:-translate-x-1/2 before:dark:bg-white before:dark:gray-800 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-3">
                            backend down
                        </span>
                    </div>
                </div>
            )}
            <h1 className='my-8 text-4xl text-[#921A40]'>Todo App</h1>
        </div>
    );
}

export default Header;
