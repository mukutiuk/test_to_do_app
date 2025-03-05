import React, { useState } from "react"
import { Task } from "../../type"

type Props = {
  task: Task;
  removeTask: (a: number, b: number) => void;
  toggleTask: (a: number, b: number) => void;
  listId: number;
  changeTaskName: (a: number, b: number, c: string) => void;
  changeTaskDescription: (a: number, b: number, c: string) => void;
}

export const TaskItem: React.FC<Props> = ( {
  task,
  removeTask,
  toggleTask,
  listId,
  changeTaskName,
  changeTaskDescription,
  }) => {
  const [editText, setEditText] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [nameText, setNameText] = useState('');

  return (
    <li key={task.id} className="flex justify-between items-center p-2 border-b">
      <div

        className="flex-grow cursor-pointer">
        <span
          onDoubleClick={() => setEditText(true)}
          className={task.completed ? "line-through text-gray-400" : ""}
        >
          {editText ? (
            <input
            onBlur={() => {
              setEditText(false);
              changeTaskName(listId, task.id, nameText);
            }}
              autoFocus
              type="text"
              value={nameText}
              onChange={e => setNameText(e.target.value)}
            />
          )
          : task.text
          }
          
        </span>
        <p
          onDoubleClick={() => setEditDescription(true)}
          className="text-sm text-gray-500"
        >
          {editDescription
            ? <input
                onBlur={() => {
                  setEditDescription(false);
                  changeTaskDescription(listId, task.id, description);
                }}
                autoFocus
                type="text"
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            : task.description
          }
        </p>
      </div>
      <div className="flex flex-col">
        <button onClick={() => removeTask(listId, task.id)} className="cursor-pointer text-red-500">✕</button>
        <button onClick={() => toggleTask(listId, task.id)} className="cursor-pointer text-red-500">ok</button>
      </div>

    </li>
  );
};
