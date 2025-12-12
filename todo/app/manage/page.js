"use client";

import { useRouter } from "next/navigation";
import todoStore from "../store/todoStore";
export default function Manage() {
  const { todos, toggleComplete, deleteTodo } = todoStore();
  const router=useRouter();
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Tasks</h1>
      {todos.length === 0 && <p>No tasks added </p>}
      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-4 text-xl"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="w-5 h-5"
            />
            <span className={todo.completed ? "line-through text-gray-500" : ""}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 ml-auto"
            >
              Delete
            </button>
               <div className="bg-amber-300 px-10 py-3  rounded-xl text-xl text-center hover:bg-amber-400">Add task

         <button onClick={(e)=>
        router.push('/home')
      }></button>
          </div>
       </div> ))}
      </div>

    </div>
  );
}