import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";

import {
  Home,
  CreatePost,
  PersonalFeed,
  Login,
  Signup,
  ProfileForm,
} from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, logout } from "./Redux/Auth/Action";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components";
export default function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getUser());
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(auth);
    dispatch(deleteUser(auth.user.id));
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to={localStorage.getItem("jwt") ? "/generate" : "login"}
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
          {localStorage.getItem("jwt") ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={
                  auth.user?.profilePicture ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.1063395417.1718365776&semt=ais_hybrid"
                }
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Delete Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<CreatePost />} />
          <Route path="/u/:userId" element={<PersonalFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-profile" element={<ProfileForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </BrowserRouter>
  );
}
