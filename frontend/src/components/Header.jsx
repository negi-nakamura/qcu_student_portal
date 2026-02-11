import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-primary-500 h-15 flex items-center justify-between px-5 sm:px-5 md:px-5 lg:px-20 relative">

            <div className="flex gap-8 md:gap-4 lg:gap-8">
                <Link to="/">
                    <img src="/src/assets/qcu_logo.png" alt="Quezon City University Logo" className="w-10"/>
                </Link>

                <nav className="hidden md:flex gap-7 md:gap-4 lg:gap-8">
                    <Link className="flex justify-center items-center gap-1" to="/">
                        <Icon icon="material-symbols:dashboard" width={20} height={20} className="text-white" />
                        <span className="text-white text-lg">Dashboard</span>
                    </Link>

                    <Link className="flex justify-center items-center gap-1" to="/courses">
                        <Icon icon="flowbite:book-solid" width={20} height={20} className="text-white" />
                        <span className="text-white text-lg">Courses</span>
                    </Link>

                    <Link className="flex justify-center items-center gap-1" to="/grades">
                        <Icon icon="tabler:clipboard-text-filled" width={20} height={20} className="text-white" />
                        <span className="text-white text-lg">Grades</span>
                    </Link>

                    <Link className="flex justify-center items-center gap-1" to="/calendar">
                        <Icon icon="solar:calendar-bold" width={20} height={20} className="text-white" />
                        <span className="text-white text-lg">Calendar</span>
                    </Link>
                </nav>
            </div>

            <div className="flex gap-5">
                <div className="flex justify-center items-center relative">
                    <Icon icon="eva:message-circle-fill" width={24} height={24} className="text-white" />
                    <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </div>

                <div className="flex justify-center items-center relative">
                    <Icon icon="tdesign:notification-filled" width={24} height={24} className="text-white" />
                    <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </div>

                <div className="flex justify-center items-center mr-10 md:mr-0">
                    <div className="overflow-hidden rounded-full border-[0.5px] border-white w-8">
                        <img src="/src/assets/default_profile.jpg" alt="Default Profile Picture"/>
                    </div>
                    <Icon icon="iconamoon:arrow-down-2" width={24} height={24} className="text-white" />
                    <Icon icon="iconamoon:arrow-up-2" width={24} height={24} className="text-white hidden" />
                </div>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-3.5 right-5 z-80 block ml-3 md:hidden text-white">
                {menuOpen ? 
                    (<img src="/src/assets/hamburger_close.svg" alt="Hamburger Menu Close" width={32} height={32} />)
                : (<img src="/src/assets/hamburger_menu.svg" alt="Hamburger Menu" width={32} height={32} />)}
            </button>

            {
                menuOpen && ( <div className="fixed top-0 right-0 h-full w-full bg-[rgba(68,68,102,0.5)] backdrop-blur-[3px] z-40 md:hidden" onClick={() => setMenuOpen(false)}> </div> )
            }

            <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <nav className="flex flex-col px-6 pt-20 text-white">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-b border-[#DCDCE4] py-2">
                        <Icon icon="material-symbols:dashboard" width={20} className="text-neutral-800" />
                        <span className="text-xl text-neutral-900">Dashboard</span>
                    </Link>
                    <Link to="/courses" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-b border-[#DCDCE4] py-2">
                        <Icon icon="flowbite:book-solid" width={20} className="text-neutral-800" />
                        <span className="text-xl text-neutral-900">Courses</span>
                    </Link>
                    <Link to="/grades" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-b border-[#DCDCE4] py-2">
                        <Icon icon="tabler:clipboard-text-filled" width={20} className="text-neutral-800" />
                        <span className="text-xl text-neutral-900">Grades</span>
                    </Link>
                    <Link to="/calendar" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-b border-[#DCDCE4] py-2">
                        <Icon icon="solar:calendar-bold" width={20} className="text-neutral-800" />
                        <span className="text-xl text-neutral-900">Calendar</span>
                    </Link>
                </nav>
            </div>

        </header>
    );
}

export default Header;