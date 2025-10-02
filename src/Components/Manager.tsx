import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSave, FaTrash, FaCopy, FaCheck, FaEdit } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";

const Manager: React.FC = () => {
  const [passwordArray, setPasswordArray] = useState<any[]>([]);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch passwords
  const getPasswords = async () => {
    const res = await fetch("http://localhost:3000/passwords");
    const passwords = await res.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Save new or update existing password
  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) return;

    if (editIndex !== null) {
      // Update locally only (for now, you'd add PUT request in backend)
      const updatedArray = [...passwordArray];
      updatedArray[editIndex] = form;
      setPasswordArray(updatedArray);
      setEditIndex(null);
      toast.success("✏️ Password updated!", { theme: "dark", transition: Bounce });
    } else {
      // Save to DB
      const res = await fetch("http://localhost:3000/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      });

      if (res.ok) {
        toast.success("🥳 Password saved!", { theme: "dark", transition: Bounce });
        getPasswords(); // Refresh from DB
      }
    }

    setForm({ site: "", username: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Delete password
  const deletePassword = async (id: string) => {
    const res = await fetch(`http://localhost:3000/passwords/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.info("🗑️ Password deleted!", { theme: "dark", transition: Bounce });
      getPasswords();
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="relative min-h-screen">
      <ToastContainer />
      <div className="flex flex-col mt-[10vh] items-center text-center text-black">
        <h1 className="text-4xl font-bold">&lt;PassOp /&gt;</h1>
        <p className="text-lg mt-2">Your Own Password Manager</p>

        {/* Input Form */}
        <div className="w-full max-w-md flex flex-col space-y-5 mt-6">
          <div className="flex items-center w-[62vh] bg-white border p-2 rounded-xl ">
            <FaUser className="text-gray-400 mr-2" />
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className=" flex-1 outline-none" />
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center bg-white border p-2 flex-1 rounded-xl">
              <FaLock className="text-gray-400 mr-2" />
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="flex-1 outline-none" />
            </div>
            <div className="w-full max-w-2xl flex items-center bg-white border p-2 rounded-xl">

              <FaEnvelope className="text-gray-400 mr-2" />
              <input name="site" value={form.site} onChange={handleChange} placeholder="Website Link" className="flex-1 outline-none" />
            </div>
          </div>
          <button onClick={savePassword} className="w-[63vh] bg-purple-600 text-white py-2 px-5 rounded-xl flex items-center justify-center space-x-2">
            <FaSave /> <span>{editIndex !== null ? "Update" : "Save"} Password</span>
          </button>
        </div>

        {/* Saved Passwords */}
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Saved Passwords</h2>
          {passwordArray.length === 0 ? (
            <p className="text-gray-500">No passwords saved yet.</p>
          ) : (
            <table className="w-full border bg-white rounded-lg overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-2">Website</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item: any, index) => (
                  <tr key={item._id || index} className="text-center border-t">
                    <td>{item.site}</td>
                    <td>{item.username}</td>
                    <td>
                      {item.password}
                      <button onClick={() => copyToClipboard(item.password, index)} className="ml-2 text-blue-500">
                        {copiedIndex === index ? <FaCheck /> : <FaCopy />}
                      </button>
                    </td>
                    <td className="flex justify-center space-x-2">
                      <button onClick={() => setForm(item)} className="text-green-500"><FaEdit /></button>
                      <button onClick={() => deletePassword(item._id)} className="text-red-500"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
