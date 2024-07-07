import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const handleKeydown = (event) => {
        if (event.key === 'Enter') {
            add();
        }
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id);
        });
    };

    const toggleComplete = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });
        });
    };

    useEffect(() => {
       localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            {/*----------title------------*/}
            <div className='flex items-center mt-7 gap-2'>
                <img src={todo_icon} alt="" className='w-8' />
                <h1 className='text-3xl font-semibold'>To-do List</h1>
            </div>

            {/*---------- input-box ------------*/}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Add your task'
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    onKeyDown={handleKeydown}
                />
                <button
                    onClick={add}
                    className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                >
                    Add
                </button>
            </div>

            {/*---------- todo list ------------*/}
            <div>
                {todoList.map((item) => (
                    <Todoitems
                        key={item.id}  // Use item.id as the key
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggleComplete={toggleComplete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
