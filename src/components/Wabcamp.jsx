import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import camera from "../assets/camera.png";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import QrReader from "react-qr-scanner";

export default function Wabcamp() {
  const navigate = useNavigate();
  const [scannedValue, setScannedValue] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [qrcode, setQrCode] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleScan = (id) => {
    if (id) {
      setScannedValue(id.text);
      fetchData(id.text);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error: ", err);
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.post(
        `https://railway-qbx4.onrender.com/vendor/fetchVendorDataByQR`,
        { qrcode: id }
      );
      if (response.data) {
        setFetchedData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputClick = () => {
    fetchData(qrcode);
  };

  const handleQrCodeValue = (e) => {
    setQrCode(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <header
        style={{
          height: "90px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <img src={Logo} style={{ height: "80px", width: "80px" }} alt="Logo" />
        <GrLogout
          style={{
            height: "30px",
            width: "30px",
            margin: "0 20px 0 0",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        />
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          padding: "20px",
          marginBottom: "150px",
        }}
      >
        {!fetchedData ? (
          <>
            <img
              src={camera}
              style={{
                height: "80px",
                marginBottom: "20px",
                marginLeft: "120px",
              }}
              alt="Camera Icon"
            />
            {isScanning && (
              <QrReader
                delay={300}
                style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }}
                onError={handleError}
                onScan={handleScan}
                facingMode="environment"
              />
            )}
            <button
              style={{
                height: "40px",
                width: "150px",
                borderRadius: "20px",
                backgroundColor: "rgb(59 130 246 / 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "100px",
              }}
              onClick={() => setIsScanning(true)}
            >
              Scan
            </button>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "0",
              }}
            >
              Please click the button to access the camera to scan the QR code
            </p>
            <div className="flex items-center justify-center p-5">
              <div className="rounded-lg bg-gray-200 p-5">
                <div className="flex">
                  <input
                    type="text"
                    value={qrcode}
                    onChange={handleQrCodeValue}
                    className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                    placeholder="Enter QR Code"
                  />
                  <button
                    onClick={handleInputClick}
                    className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              padding: "10px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "80%",
            }}
          >
            <h3>Fetched Data:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    First Name:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.fname}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Middle Name:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.mname}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Last Name:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.lname}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Date of Birth:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {new Date(fetchedData.dob).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Mobile:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.mobile}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Aadhar:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.aadhar}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    QR Code:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.qrcode}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Location of Stall:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.locationOfStall}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Profile Picture:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <img
                      src={fetchedData.profilePic}
                      alt="Profile"
                      style={{ maxHeight: "100px", borderRadius: "10px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: "8px", border: "1px solid lightgray" }}>
                    Aadhar Card Image:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <img
                      src={fetchedData.aadharCardImage}
                      alt="Aadhar Card"
                      style={{ maxHeight: "100px", borderRadius: "10px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer
        style={{
          height: "60px",
          backgroundColor: "lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>WABCamp Project</p>
      </footer>
    </div>
  );
}
