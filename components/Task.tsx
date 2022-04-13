import { useState } from "react";

import { Task } from "../types/types";
import fetcher from "../lib/fetcher";

type Props = {
  task: Task;
};

const Task = ({ task }: Props) => {
  const { id, description, completed } = task;
  const [checked, setChecked] = useState(completed);

  const handleDelete = () => {
    fetcher(`/tasks/${id}`, "DELETE");
  };

  const handleUpdate = (completed: boolean) => {
    fetcher(`/tasks/${id}`, "PATCH", { completed });
  };

  return (
    <div className="flex justify-between" key={id}>
      <div className="flex items-center gap-4">
        <input
          className="w-4 h-4"
          id={`task-${id}`}
          name={`task-${id}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            const { checked } = e.target;
            setChecked(checked);
            handleUpdate(checked);
          }}
        />
        <label
          className={checked ? "line-through cursor-pointer" : "cursor-pointer"}
          htmlFor={`task-${id}`}
        >
          {description}
        </label>
      </div>
      <button
        className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-600 transition duration-300 flex items-center justify-center"
        onClick={handleDelete}
      >
        <svg
          className="w-4 h-4 fill-gray-300"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="768"
          height="768"
          viewBox="0 0 768 768"
        >
          <title></title>
          <g id="icomoon-ignore"></g>
          <path d="M576 224v416c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-320c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-416zM544 160v-32c0-26.496-10.784-50.56-28.128-67.872s-41.376-28.128-67.872-28.128h-128c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v32h-128c-17.664 0-32 14.336-32 32s14.336 32 32 32h32v416c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h320c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872v-416h32c17.664 0 32-14.336 32-32s-14.336-32-32-32zM288 160v-32c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h128c8.832 0 16.8 3.552 22.624 9.376s9.376 13.792 9.376 22.624v32zM288 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32zM416 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Task;
