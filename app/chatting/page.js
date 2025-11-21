"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../core/firebase";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const msgs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() || {}),
        }));
        setMessages(msgs);
      } catch (err) {
        console.error("Error mapping messages", err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      const senderId = auth?.currentUser?.uid;
      if (!senderId) throw new Error("No authenticated user");

      await addDoc(collection(db, "messages"), {
        text: newMessage,
        senderId,
        createdAt: serverTimestamp(),
      });

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="p-4 bg-blue-900 font-serif text-white text-lg font-semibold">
          Chat Room
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Array.isArray(messages) &&
            messages.map((msg, i) => {
              const isUser = msg?.senderId === auth?.currentUser?.uid;

              return (
                <div
                  key={msg?.id ?? i}
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 max-w-xs rounded-lg text-white ${
                      isUser ? "bg-blue-600" : "bg-gray-500"
                    }`}
                  >
                    {msg?.text}
                  </div>
                </div>
              );
            })}

          <div ref={bottomRef}></div>
        </div>
        <form
          onSubmit={sendMessage}
          className="p-3 border-t font-serif flex gap-2 bg-gray-50"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 font-serif text-black py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 font-serif bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
