"use client";
import { useRouter } from "next/navigation";
import todoStore from "./store/todoStore";

export default function Dashboard() {
  const router=useRouter();
  const todos = todoStore((state) => state.todos);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">To Do Summary</h1>

      <div className="text-xl mb-10">
        <p>Total Tasks: {total}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
      </div>

      <div className="flex flex-col gap-5">
      <button onClick={(e)=>
        router.push('/todo')
      }
      className="bg-amber-300 px-10 py-3  rounded-xl text-xl text-center hover:bg-amber-400">Add task</button>

         <button onClick={(e)=>
        router.push('/manage')
      }
      className="bg-gray-200 px-10 py-3  rounded-xl text-xl text-center hover:bg-gray-300">Manage task</button>
      </div>

    </div>
  );
}