import React from 'react'
import { GoBell, GoChevronDown } from "react-icons/go";


const Nav = () => {
    return (
        <div className='flex items-center justify-between px-20 py-3 border-2'>
            <div>LOGO</div>
            <div className=''>
                <ul className='flex space-x-10'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Jobs</li>
                    <li>Insight</li>
                </ul>
            </div>
            <div className='flex items-center space-x-3'>
                <GoBell/>
                <div className='flex items-center space-x-4'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3zo4EAEtqcvbiwxdlgnNUUgMrqbIPezOkDKeoFLRLdoCamQ3t23r8C5hePqGbqgROu_k&usqp=CAU" alt="" className='w-10 h-10 border rounded-full'/>
                    <h1>John Doe</h1>
                    <GoChevronDown size={20}/>
                </div>
            </div>
        </div>
    )
}

export default Nav