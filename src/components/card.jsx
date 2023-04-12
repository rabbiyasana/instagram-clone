import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
export default function (props) {
  return (
    <>
      <div className="card text-start">
        <img className="card-img-top" src={props.url} alt="post-img" />
        <div className="card-body">
          {/* <h4 className="card-title">Post Id:</h4>
          {props.postId} */}

          <h6 className="card-text">{props.caption}</h6>
        </div>
        <div className="card-footer">
          <div className="row">
            {/* <div className="col-3">
              <button className="btn btn-c btn-lng" onClick={props.handleEdit}>
                <FaEdit /> 
              </button>
            </div> */}
            <div className="col-3">
              <button className="btn btn-c btn-lng" onClick={props.handleEdit}>
                <FaEdit />
              </button>
            </div>
            <div className="col-3">
              <button
                className="btn btn-c btn-lng"
                onClick={props.handleDelete}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
