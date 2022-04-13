import { ChangeEvent, FormEventHandler, useState } from "react";
import fetcher from "../lib/fetcher";

const TaskForm = () => {
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit: FormEventHandler = (e: ChangeEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    fetcher("/tasks", "POST", { description, completed: false })
      .then(() => {
        setIsProcessing(false);
      })
      .catch((error) => {
        setIsProcessing(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        className="block w-full py-3 px-4 rounded border-2 border-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:outline-none text-gray-700"
        placeholder="Enter something to do"
        id="task"
        name="task"
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        required
      />
      <div className="text-right">
        <button
          className="inline-block mt-4 px-8 py-3 bg-purple-500 hover:bg-purple-400 transition duration-300 rounded text-white"
          type="submit"
          disabled={isProcessing}
        >
          Add a todo
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
