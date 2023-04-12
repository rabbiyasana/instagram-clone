import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./navigation";
import Card from "./card";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";
import Webcam from "react-webcam";
import { v4 } from "uuid";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContetxt";
export default function () {
  // setting states
  let [isEdit, setIsEdit] = useState(false);
  let [posts, setPosts] = useState([]);
  const { loggedIn, setLoggedIn } = useAuth();

  const cap = React.useRef();
  const post_img = React.useRef();
  function createPost() {
    // creating file reader
    const file = post_img.current.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      const url = fileReader.result;
      let caption = cap.current.value;
      // Creating new post
      let newPost = {
        postId: v4(),
        caption,
        src: url,
      };
      // Adding new post
      const postArray = [...posts];
      postArray.push(newPost);
      setPosts(postArray);
      cap.current.value = "";
      post_img.current.value = "";
      cap.current.focus();
    });
  }

  const deletePost = (id) => {
    setPosts((oldPosts) => {
      return oldPosts.filter((post) => post.postId !== id);
    });
  };
  const editPost = (id, newCaption) => {
    const updatedCaptionPost = posts.map((post) => {
      if (post.postId === id) {
        post.caption = newCaption;
      }
      return post;
    });
    setPosts(updatedCaptionPost);
  };

  // const { authed, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  // web cam feature
  const WebcamComponent = () => <Webcam />;
  const videoConstraints = {
    width: 50,
    height: 50,
    facingMode: "user",
  };

  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });

  if (loggedIn === false) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return (
    <>
      <div className="container text-left">
        <Navigation />
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12 ">
            <div className="mb-3">
              <div
                className="p-2 rounded-1"
                style={{ backgroundColor: "#4CB5F9", color: "#fff" }}
              >
                <p>Create a Post</p>
              </div>

              <div className="form-group">
                <textarea className="form-control" ref={cap}></textarea>
                <input
                  ref={post_img}
                  type="file"
                  name=""
                  id="upload-img"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                {/* web cam */}

                {/* {picture == "" ? (
                  <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    width={400}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={picture} />
                )} */}
              </div>
              <div>
                {picture != "" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPicture();
                    }}
                    className="btn btn-primary"
                  >
                    Retake
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className="btn btn-danger"
                  >
                    Capture
                  </button>
                )}
              </div>
              <div className="form-group border">
                <button className="btn btn-c btn-lng" onClick={createPost}>
                  <FaCheckSquare /> post
                </button>
              </div>

              {/* <p>{f}</p> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="main border">
              <div className="container-fluid">
                <div className="row text-right bg-primary">
                  <div className="col-lg-2">
                    {/* {authed && (
                      <button className="btn" onClick={handleLogout}>
                        logout
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
              {posts.map((post) => {
                return (
                  <>
                    <Card
                      handleEdit={editPost}
                      handleDelete={() => deletePost(post.postId)}
                      postId={post.postId}
                      caption={post.caption}
                      url={post.src}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
