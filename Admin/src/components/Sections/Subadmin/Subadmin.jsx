import React, { useState, useEffect } from "react";
import "./Subadmin.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Subadmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coolieno1.in/v1.0/admin/sub-admin",
        );
        if (!response.ok) {
          throw new Error("Error occurred");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSend = (admin) => {
    navigate("/viewadmin", { state: { admin } });
  };

  return (
    <>
      <div className="sub-admin-main-con">
        <button
          onClick={() => {
            navigate("/addsubadmin");
          }}
        >
          Add Sub-admin
        </button>
        <button
          onClick={() => {
            navigate("/managesubadmin");
          }}
        >
          Manage Sub-admin
        </button>
      </div>
      <div className="get-data">
        {formData.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Full Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Mobile No
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Designation
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Email
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.map((admin) => (
                <tr key={admin._id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {admin.fullName}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {admin.mobileNo}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {admin.designation}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {admin.emailforCommunication}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: "center",
                    }}
                    onClick={() => handleSend(admin)}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "#000", fontSize: "20px" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Subadmin;
