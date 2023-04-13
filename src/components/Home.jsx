import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./navigation";
import Card from "./card";
import { FaCheckSquare } from "react-icons/fa";
import { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { v4 } from "uuid";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContetxt";
import { FaCamera } from "react-icons/fa";

export default function () {
  // setting states
  let [isEdit, setIsEdit] = useState(false);
  let [posts, setPosts] = useState([]);
  const { loggedIn, setLoggedIn } = useAuth();

  const cap = React.useRef();
  const post_img = React.useRef();
  const post_type = React.useRef();
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
        post_type,
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
  // delete post function
  const deletePost = (id) => {
    setPosts((oldPosts) => {
      return oldPosts.filter((post) => post.postId !== id);
    });
  };

  // edit post function
  const editPost = (id, newCaption) => {
    const updatedCaptionPost = posts.map((post) => {
      if (post.postId === id) {
        post.caption = newCaption;
      }
      return post;
    });
    setPosts(updatedCaptionPost);
  };

  if (loggedIn === false) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  // camera state , video constraints , call back
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: { min: 150 },
    height: { min: 120 },
    facingMode: "user",
  };
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    console.log(img);
  }, [webcamRef]);

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
                {/* <span>Capture</span>{" "} */}
                <button
                  className="btn "
                  onClick={() => {
                    // <Cam />;
                  }}
                >
                  {" "}
                  <FaCamera />
                </button>

                {/* camera component */}
                {/* <div className="form-group">
                  <Webcam
                    className="my-2"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={180}
                    height={120}
                    videoConstraints={videoConstraints}
                  />
                  <button onClick={capture}>Capture photo</button>
                  <img src={img} alt="screenshot" />
                  <button onClick={() => setImg(null)}>Retake</button>
                </div> */}
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="public"
                  id="public"
                  // ref={post_type}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Public
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="private"
                  id="private"
                  // ref={post_type}
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Private
                </label>
              </div>
              <div className="form-group border">
                <button className="btn btn-c btn-lng" onClick={createPost}>
                  <FaCheckSquare /> post
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="main border">
              <div className="container-fluid">
                <div className="row text-right bg-primary">
                  <div className="col-lg-2"></div>
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
                      // post_type={post.post_type}
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
