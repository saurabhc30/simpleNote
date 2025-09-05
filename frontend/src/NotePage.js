import React, { useState, useEffect } from "react";
import axios from "axios";
import PageNavbar from "./PageNavbar";

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListOpen, setIsListOpen] = useState(false); // for mobile toggle

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/notes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchQuery) ||
      note.content?.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <PageNavbar onSearch={handleSearch} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Notes List (Sidebar) */}
        <div
          className={`bg-[#181a1b] border-r border-gray-700 w-64 p-4 overflow-y-auto 
            md:block ${isListOpen ? "block" : "hidden"} md:relative fixed inset-y-0 left-0 z-40`}
        >
          <h2 className="text-lg font-bold mb-4 text-white">My Notes</h2>
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              onClick={() => {
                setSelectedNote(note);
                setIsListOpen(false); // close on mobile
              }}
              className={`p-2 rounded-lg mb-2 cursor-pointer ${
                selectedNote?._id === note._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {note.title?.length > 10
                ? note.title.substring(0, 10) + "..."
                : note.title || "Untitled"}
            </div>
          ))}
        </div>

        {/* Note Content */}
        <div className="flex-1 bg-[#1f2123] p-6 overflow-y-auto text-white">
          {selectedNote ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedNote.title}</h2>
              <div className="whitespace-pre-wrap">{selectedNote.content}</div>
            </>
          ) : (
            <p className="text-gray-400">Select a note to view</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotePage;
