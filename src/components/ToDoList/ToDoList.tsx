import { useEffect, useState } from "react";
import { Task } from "../../type";
import { TaskItem } from "../Task/Task";


export const ToDoList = () => {
  interface ToDoList {
    id: number;
    name: string;
    tasks: Task[];
  }

  const [lists, setLists] = useState<ToDoList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/toDoLists')
    .then(data => data.json())
    .then(setLists);
  }, []);

  const addList = () => {
    if (newListName.trim() === "") return;
    const newId =  Date.now();
    setLists([...lists, { id: newId, name: newListName, tasks: [] }]);
    setNewListName("");

    fetch('http://localhost:5000/toDoLists', {
      method: 'POST',
      body: JSON.stringify({
        id: newId,
        name: newListName,
        tasks: []
      }),
    })
  };

  const removeList = (id: number) => {
    setLists(lists.filter(list => list.id !== id));

    fetch('http://localhost:5000/toDoLists/' + id, {
      method: 'DELETE',
    }).then(e => console.log( e.ok))
  };

  const addTask = () => {
    if (!selectedListId || newTaskText.trim() === "") return;
    const newId = Date.now();
    setLists(lists.map(list => 
      list.id === selectedListId 
        ? { ...list, tasks: [...list.tasks, { id: newId, text: newTaskText, description: newTaskDescription, completed: false }] }
        : list
    ));
 
    setNewTaskText("");
    setNewTaskDescription("");
  };

  const changeTaskName = (listId: number, taskId: number, newName: string) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? { ...task, text: newName} : task) }
        : list
    ));
  };

  const changeTaskDescription = (listId: number, taskId: number, newDescroption: string) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? { ...task, description: newDescroption} : task) }
        : list
    ));
  };

  const toggleTask = (listId: number, taskId: number) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) }
        : list
    ));
  };

  const removeTask = (listId: number, taskId: number) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    ));

    fetch(`http://localhost:5000/toDoLists/${listId}/tasks/${taskId}`, {
      method: 'DELETE',
    }).then(e => console.log( e.ok))
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-xl font-bold mb-4">To-Do App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="border p-2 w-full rounded-lg"
          placeholder="Enter list"
        />
        <button onClick={addList} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full cursor-pointer">Add List</button>
      </div>
      {lists.map(list => (
        <div key={list.id} className="mb-4 p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{list.name}</h2>
            <button onClick={() => removeList(list.id)} className="text-red-500">✕</button>
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="border p-2 w-full rounded-lg"
              placeholder="Task name..."
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="border p-2 w-full rounded-lg mt-2"
              placeholder="Task description..."
            />
            <button onClick={() => { setSelectedListId(list.id); addTask(); }} className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 w-full">Add Task</button>
          </div>
          <ul className="mt-2">
            {list.tasks.map(task => (
              <TaskItem
                key={task.id}
                listId={list.id}
                toggleTask={toggleTask}
                removeTask={removeTask}
                task={task}
                changeTaskName={changeTaskName}
                changeTaskDescription={changeTaskDescription}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
