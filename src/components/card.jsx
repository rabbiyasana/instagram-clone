import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
export default function (props) {
  let [isEdit, setIsEdit] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      caption: props.caption,
    },
    onSubmit: (values) => {
      values.caption;
      props.handleEdit(props.postId, values.caption);
      setIsEdit(false);
    },
  });

  return (
    <>
      <div className="card text-start">
        <img className="card-img-top" src={props.url} alt="post-img" />
        <div className="card-body">
          {/* <h4 className="card-title">Post Id:</h4>
          {props.postId} */}
          {isEdit ? (
            <>
              <input
                id="caption"
                name="caption"
                type="text"
                value={values.caption}
                onChange={handleChange}
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                update
              </button>
            </>
          ) : (
            <h6 className="card-text">{props.caption}</h6>
          )}
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col-3">
              <span>This is a {props.post_type}</span>
              <button
                className="btn btn-c btn-lng"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
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
