"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import todoStore from "../store/todoStore";

export default function AddTodo() {
  const [text, setText] = useState("");
  const addTodo = todoStore((state) => state.addTodo);
  const router = useRouter();

  const handleSubmit = () => {
    if (text.trim() === "") return;
    addTodo(text);
    router.push("/manage");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-4 py-2 w-72 rounded-lg mb-5 text-lg"
        placeholder="Enter you task here"
      />

      <button
        onClick={handleSubmit}
        className="bg-amber-300 px-8 py-3 rounded-xl text-xl hover:bg-amber-400"
      >
        Add Task
      </button>

    </div>
  );
}