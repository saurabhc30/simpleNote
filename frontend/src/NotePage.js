import React, { useState, useEffect } from "react";
import axios from "axios";
import PageNavbar from "./PageNavbar";
import Login from "./Components/Login";
import { TrashIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ toggle sidebar on mobile

  // Load notes on login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://simplenote-6msa.onrender.com/api/notes",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };

  const handleAddNewNoteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://simplenote-6msa.onrender.com/api/notes",
        { title: "Untitled", content: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const createdNote = response.data;
      const updatedNotes = [...notes, createdNote];
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      setSelectedNoteIndex(updatedNotes.length - 1);
      setEditingNoteIndex(updatedNotes.length - 1);
    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
    }
  };

  const handleNoteChange = async (index, key, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index][key] = value;
    setNotes(updatedNotes);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://simplenote-6msa.onrender.com/api/notes/${updatedNotes[index]._id}`,
        updatedNotes[index],
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating note:", error.response?.data || error.message);
    }
  };

  const handleDeleteNote = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://simplenote-6msa.onrender.com/api/notes/${notes[index]._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      setSelectedNoteIndex(null);
      setEditingNoteIndex(null);
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  const handleSearch = (query) => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setNotes([]);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <PageNavbar onSearch={handleSearch} onLogout={handleLogout} />

          <div className="flex h-screen" style={{ backgroundColor: "#1f2123" }}>
            {/* Sidebar */}
            <div
              className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-700 p-4 flex flex-col transform transition-transform duration-300 z-40
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  onClick={handleAddNewNoteClick}
                >
                  + New Note
                </button>
                {/* Close on mobile */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto">
                {filteredNotes.map((note, index) => (
                  <li
                    key={note._id}
                    className={`flex justify-between items-center px-3 py-2 mb-2 rounded-lg cursor-pointer ${
                      index === selectedNoteIndex
                        ? "bg-blue-700 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedNoteIndex(index);
                      setEditingNoteIndex(index);
                      setSidebarOpen(false); // auto close sidebar on mobile
                    }}
                  >
                    {/* Show only 10 characters */}
                    <span>
                      {note.title.length > 10
                        ? note.title.substring(0, 10) + "..."
                        : note.title}
                    </span>
                    <TrashIcon
                      className="w-5 h-5 text-red-400 hover:text-red-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(index);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Note Editor */}
            <div className="flex-1 p-6 text-white relative">
              {/* Toggle button for mobile */}
              <button
                className="absolute top-4 left-4 md:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>

              {editingNoteIndex !== null ? (
                <div className="h-full flex flex-col">
                  <input
                    type="text"
                    className="w-full mb-4 p-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Title"
                    value={filteredNotes[editingNoteIndex]?.title || ""}
                    onChange={(e) =>
                      handleNoteChange(editingNoteIndex, "title", e.target.value)
                    }
                  />
                  <textarea
                    className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
                    placeholder="Write your note here..."
                    value={filteredNotes[editingNoteIndex]?.content || ""}
                    onChange={(e) =>
                      handleNoteChange(
                        editingNoteIndex,
                        "content",
                        e.target.value
                      )
                    }
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select or create a note to get started
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default NotesPage;
