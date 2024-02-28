import {
  faEdit,
  faFile,
  faPaperPlane,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Sidenav = () => {
  const [activeLink, setActiveLink] = useState("inbox");
  const [signOut, setSignOut] = useState(false);
  const location = useLocation();

  //CSS TRANSITION STYLES
  const myClassNames = {
    enter: "opacity-0",
    enterActive: "opacity-100 transition-opacity duration-500 ease-in-out",
    // exit: 'opacity-100',
    exitActive: "opacity-0 transition-opacity duration-500 ease-in-out",
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <CSSTransition
        in={signOut}
        classNames={myClassNames}
        timeout={500}
        unmountOnExit
      >
        <div className="fixed z-20 top-0 right-0 bg-slate-200/20 h-screen w-full flex items-center justify-center flex-col backdrop-blur-xl">
          <div className="flex items-center space-y-4 justify-center flex-col">
            <h1>You will have to log in again. Are you sure?</h1>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 px-4 py-2 text-white rounded-md">
                Yes
              </button>
              <button
                onClick={() => setSignOut(false)}
                className="border px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
      <div className="fixed left-0 top-0 h-screen w-[300px] flex flex-col justify-between backdrop-blur-xl bg-slate-200/20 p-3">
        <div className="mt-10">
          <small>Favourites</small>
          <Link to="/">
            <button
              onClick={() => handleLinkClick("/")}
              className={`w-full mt-3 hover:bg-slate-500 ${
                activeLink === "/" ? "bg-slate-500/40" : ""
              } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
            >
              <FontAwesomeIcon icon={faInbox} /> &nbsp; Inbox
            </button>
          </Link>

          <Link to="/mail">
            <button
              onClick={() => handleLinkClick("/mail")}
              className={`w-full mt-3 hover:bg-slate-500 ${
                activeLink === "/mail" ? "bg-slate-500/40" : ""
              } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
            >
              <FontAwesomeIcon icon={faEdit} /> &nbsp; Compose Mail
            </button>
          </Link>

          <Link to="/draft">
            <button
              onClick={() => handleLinkClick("/draft")}
              className={`w-full mt-3 hover:bg-slate-500 ${
                activeLink == "/draft" ? "bg-slate-500/40" : ""
              } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
            >
              <FontAwesomeIcon icon={faFile} /> &nbsp; Drafts
            </button>
          </Link>

          <Link to="/sent">
            <button
              onClick={() => handleLinkClick("/sent")}
              className={`w-full mt-3 hover:bg-slate-500 ${
                activeLink == "/sent" ? "bg-slate-500/40" : ""
              } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Sent
            </button>
          </Link>

          <Link to="/bin">
            <button
              onClick={() => handleLinkClick("/bin")}
              className={`w-full mt-3 hover:bg-slate-500 ${
                activeLink == "/bin" ? "bg-slate-500/40" : ""
              } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Bin
            </button>
          </Link>
        </div>
        <div>
          <button
            onClick={() => setSignOut(true)}
            className={`w-full mt-3 hover:bg-slate-500 ${
              activeLink == "/signOut" ? "bg-slate-500/40" : ""
            } transition-all ease-in-out duration-300 flex items-center justify-start p-2 rounded-md`}
          >
            <FontAwesomeIcon icon={faUser} /> &nbsp; Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
