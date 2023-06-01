import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { apiURL } from "../../utils/APIRoutes";
import QRCode from "react-qr-code";

const Table = ({ user }) => {
  const [stockData, setStockData] = useState(
    JSON.parse(localStorage.getItem("stockData"))
  );
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [qrcode, setQRCode] = useState("");

  const sendEmailHandler = () => {
    emailjs
      .sendForm(
        "service_fuf202i",
        "template_umxqjhr",
        form.current,
        "9jjEZ4Q1b7CYAn7Uu"
      )
      .then(() => {
        alert("Email Sent Successfully. Please check spam also.");
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getQRCode = async () => {
    // setLoading(true);
    // const res = await axios.post(`${apiURL}/auth/whatsapp`, {
    //   phone,
    //   msg: stockData,
    // });
    // console.log(res.data);
    // setQRCode(res.data);
    // setLoading(false);
    let number = phone.replace(/[^\w\s]/gi, "").replace(/ /g, "");

    // Appending the phone number to the URL
    let url = `https://web.whatsapp.com/send?phone=${number}`;
    url += `&text=${encodeURI(
      `Hello Stockx Update!!Stock Price(in USD) of ${stockData.symbol}: ${stockData["1. open"]}`
    )}&app_absent=0`;
    window.open(url);
  };

  return (
    <Container>
      <Navbar user={user} />

      {stockData && (
        <div
          style={{
            margin: "1% 0 0 25%",
            width: "50%",
          }}
        >
          <h2>Company Symbol: {stockData && stockData.symbol}</h2>
          <table class="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">Key Data</th>
                <th scope="col">Value(in $)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Opening Value</td>
                <td>{stockData && stockData["1. open"]}</td>
              </tr>
              <tr>
                <td>High Value</td>
                <td>{stockData && stockData["2. high"]}</td>
              </tr>
              <tr>
                <td>Low Value</td>
                <td>{stockData && stockData["3. low"]}</td>
              </tr>
              <tr>
                <td>Closing Value</td>
                <td>{stockData && stockData["4. close"]}</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td>{stockData && stockData["5. volume"]}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("stockData");
              window.location.reload();
            }}
          >
            Clear Stock Data
          </button>
          <br />
          <br />
          <form ref={form}>
            <div class="form-group m-2">
              <h6>Email Address</h6>
              <input
                type="email"
                name="email"
                class="form-control m-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Receiver Email"
              />
              <input
                type="hidden"
                name="symbol"
                value={stockData && stockData.symbol}
              />
              <input
                type="hidden"
                name="open"
                value={stockData && stockData["1. open"]}
              />
              <input
                type="hidden"
                name="close"
                value={stockData && stockData["4. close"]}
              />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              style={{ marginLeft: "2%" }}
              onClick={sendEmailHandler}
            >
              Email Stock Data
            </button>
          </form>
          <br />
          <h6>Phone Number</h6>
          <input
            class="form-control m-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
          <button
            style={{ marginLeft: "2%" }}
            onClick={getQRCode}
            class="btn btn-primary"
          >
            Send Whatsapp message
          </button>
          {/* {!loading && qrcode && (
            <div style={{ marginTop: "5px" }}>
              <QRCode value={qrcode} />
            </div>
          )}
          {loading && "Waiting for QRCode..."} */}
        </div>
      )}
      {!stockData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <h5>Please go to the home page and enter any Stock Symbol.</h5>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: #86c8bc;
  height: 100vh;
  width: 100vw;
`;

export default Table;
