import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const Todoitems = ({ text, id, isComplete, deleteTodo, toggleComplete }) => {
    const handleDeleteClick = (event) => {
        event.stopPropagation();  // Prevent event bubbling
        deleteTodo(id);
    };

    return (
        <div onClick={() => toggleComplete(id)} className='flex items-center my-3 gap-2'>
            <div className='flex flex-1 items-center cursor-pointer'>
                <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
                <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? 'line-through' : ''}`}>{text}</p>
            </div>
            <img
                onClick={handleDeleteClick}
                src={delete_icon}
                alt=""
                className='w-3.5 cursor-pointer'
            />
        </div>
    );
};

export default Todoitems;
