import React, { useRef } from "react";
import { Form, NavLink, useLoaderData, useRevalidator } from "react-router-dom";
import del from "../assets/delete.png";
import upd from "../assets/edit.png";

export async function action({ request }) {
  const formData = await request.formData();
  const todo = {
    id: crypto.randomUUID(),
    text: formData.get("task"),
  };

  const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
  currentTodos.push(todo);
  localStorage.setItem("task", JSON.stringify(currentTodos));
  return null;
}

export function loader() {
  const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
  return currentTodos;
}

function Body() {
  const data = useLoaderData();
  const { revalidate } = useRevalidator();
  const getTasks = data.map((todo) => {
    return (
      <li
        key={todo.id}
        className="flex justify-between items-center bg-whitesmoke shadow-md rounded-md px-3 py-2 hover:shadow-xl transition cursor-pointer"
      >
        <span className="truncate">{todo.text}</span>
        <div className="flex space-x-4">
          <NavLink
            to={`/${todo.id}`}
            className="w-5 h-5 opacity-70 hover:opacity-100 transition"
          >
            <img src={upd} alt="edit" />
          </NavLink>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="w-5 h-5 opacity-70 hover:opacity-100 transition"
          >
            <img src={del} alt="delete" />
          </button>
        </div>
      </li>
    );
  });
  function deleteTodo(id) {
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updatedTodos = currentTodos.filter((el) => el.id !== id);
    localStorage.setItem("task", JSON.stringify(updatedTodos));
    revalidate();
  }
  return (
    <div className="w-full p-4 flex flex-col space-y-5">
      <Form method="post" className="flex space-x-3">
        <input
          type="text"
          placeholder="e.g: Make a coffee"
          name="task"
          className="h-10 rounded-md border-2 w-full px-3 outline-none focus:ring-1"
          required
        />

        <input
          type="submit"
          value="Add"
          className="flex items-center justify-center rounded-md w-20 bg-blue-950 text-[#E1D9D1] font-semibold hover:opacity-90 transition"
        />
      </Form>
      {data.length > 0 && (
        <ul className="w-full font-semibold flex flex-col space-y-3">
          {getTasks}
        </ul>
      )}
    </div>
  );
}

export default Body;
