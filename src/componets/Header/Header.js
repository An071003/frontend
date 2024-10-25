import React, { useState } from 'react';
import './Header.css'; // Bạn có thể xóa hoặc chỉnh sửa file này nếu không cần thiết.

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFoodList = (isOpen) => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-800 heigh-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a className="flex text-white text-lg font-bold" href="/">
                    <img className="Logo card-img-top" src="/img/Logo.jpg" alt="Logo" />
                    XXGaming
                </a>
                <button className="text-white md:hidden" type="button" aria-expanded="false" aria-label="Toggle navigation">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
                <div className="hidden md:flex md:items-center md:space-x-4">
                    <ul className="flex space-x-4">
                        <li>
                            <a className="text-white hover:text-gray-300" href="/Foods/manager">FoodListManager</a>
                        </li>
                        <li>
                            <a className="text-white hover:text-gray-300" href="/Foods/List">F&B</a>
                        </li>
                        <li className="relative">
                            <a className="text-white hover:text-gray-300" href="#" id="dropdownMenuButton" aria-expanded="false" onClick={() => toggleFoodList(isOpen)}>
                                Dropdown
                            </a>
                            <ul className={`absolute ${isOpen ? '' : 'hidden'} mt-2 w-48 bg-white rounded-md shadow-lg group-hover:block`}>
                                <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Action</a></li>
                                <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Another action</a></li>
                                <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
