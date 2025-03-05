import { useState } from "react"

export const Form = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="flex flex-col w-96 gap-4 my-7" action="">
      <label htmlFor="">
        Name: 
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        className="w-96 h-10 border-2"
        type="text"
        placeholder="Name"
      />
      </label>
      <label htmlFor="">
        Email:
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        className="w-96 h-10 border-2"
        type="emil"
      />
      </label>
      <label htmlFor="">
        Password:
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        className="w-96 h-10 border-2"
        type="password"
      />
      </label>

      <button className="w-96 h-10 border-2 cursor-pointer bg-blue-500 rounded-lg bg-blue-500" type="submit">Submit</button>
    </form>
  )
}