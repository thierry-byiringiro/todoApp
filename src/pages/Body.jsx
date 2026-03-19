import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import del from "../assets/delete.png";
import upd from "../assets/edit.png";

export async function action({ request }) {
  const formData = await request.formData();
  const task = formData.get("task");
  const currentTasks = JSON.parse(localStorage.getItem("task") || "[]");
  currentTasks.push(task);
  localStorage.setItem("task", JSON.stringify(currentTasks));
  return null;
}
export function loader() {
  const currentTasks = JSON.parse(localStorage.getItem("task") || "[]");
  return currentTasks;
}
function Body() {
  const data = useLoaderData();
  const getTasks = data.map((task, id) => {
    return (
      <div key={id} className="flex space-x-6 justify-between">
        <li>{task}</li>
        <div className="flex space-x-6">
          <button className="w-5 h-5"><img src={upd} alt="" /></button>
          <button className="w-5 h-5"><img src={del} alt="" /></button>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full p-4 flex flex-col space-y-5">
      <Form method="post" className="flex space-x-3">
        <input
          type="text"
          placeholder="e.g:Make a coffe"
          name="task"
          className="h-10 rounded-md border w-full placeholder:p-2 p-2"
        />
        <input
          type="submit"
          value="Add"
          className="flex items-center justify-center rounded-md w-20 bg-blue-950 text-[#E1D9D1] font-semibold"
        />
      </Form>
      <ul className="w-full font-semibold px-4 list-disc ml-4">{getTasks}</ul>
    </div>
  );
}

export default Body;
