import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";
function RepoList({ data }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">Top Repos</h2>
        {data.map((repo, index) => (
        <RepoItem key={index} repo={repo}/>
      ))}
      </div>
     
    </div>
  );
}
RepoList.propTypes = {
  data: PropTypes.array
}

export default RepoList;
