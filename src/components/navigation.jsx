import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function () {
  let navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-lg-7 col-lg-5">
            <nav className="d-flex justify-content-center">
              <div className="p-2"></div>
              <div className="p-2">
                <Button
                  className=" btn btn-primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
