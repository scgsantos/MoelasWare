import React from "react";

const Drafts = () => {
  document.documentElement.style.setProperty("--base", "var(--blue)");

  return (
    <React.Fragment>
      <main className="container" id="drafts">
        <h1 className="title">CREATE A QUIZ</h1>
        <h2>DRAFTS</h2>
      </main>
    </React.Fragment>
  );
};

export default Drafts;
