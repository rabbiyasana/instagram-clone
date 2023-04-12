import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./navigation";
import Card from "./card";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";
import Webcam from "react-webcam";
import { v4 } from "uuid";
export default function () {
  // setting states
  let [editCap, setEditCap] = useState({ isEdit: false });
  let [posts, setPosts] = useState([]);
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
  const editPost = () => {
    setEditCap = { isEdit: true };
  };

  // const { authed, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };
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
                {/* <Webcam
                  width={100}
                  audio={false}
                  height={720}
                  screenshotFormat="image.jpeg"
                  // width={1280}
                  // videoConstraints={videoConstraints}
                >
                  {({ getScreenshot }) => (
                    <button
                      onClick={() => {
                        const imageSrc = getScreenshot();
                      }}
                    >
                      Capture photo
                    </button>
                  )}
                </Webcam> */}
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
                    {!editCap.isEdit ? (
                      <Card
                        handleEdit={() => editPost()}
                        handleDelete={() => deletePost(post.postId)}
                        postId={post.postId}
                        caption={post.caption}
                        url={post.src}
                      />
                    ) : (
                      <EditCard />
                    )}
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
