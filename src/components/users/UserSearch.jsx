import React from "react";
import { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import GithubContext from "../../context/github/GithubContext";

function UserSearch() {
  const { users, searchUsers, clearResults } = useContext(GithubContext);
  const {  setAlert } = useContext(AlertContext);
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error")
    } else {
    searchUsers(text)
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                onChange={handleChange}
                value={text}
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
              ></input>
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={clearResults} className="btn btn-ghost btn-lg">clear</button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
