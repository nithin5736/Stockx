import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import axios from "axios";
import { apiURL } from "../../utils/APIRoutes";

const Home = ({ user }) => {
  const [symbol, setSymbol] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/api/stock`, { symbol })
      .then((res) => {
        localStorage.setItem(
          "stockData",
          JSON.stringify({ ...res.data.data, symbol })
        );
        window.location.href = "/table";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar user={user} />
      <Container>
        <form
          class="form-inline my-2 my-lg-0"
          style={{ padding: "3% 20% 0 20%" }}
          onSubmit={submitHandler}
        >
          <h5 for="exampleInputEmail1" style={{ color: "white" }}>
            Search by Symbol (Ex: GOOG for Google)
          </h5>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={{ marginBottom: "1%" }}
          />
          <button class="btn btn-light my-2 my-sm-0" type="submit">
            Search
          </button>
          <br />
          <br />
          <h6>
            Please navigate to "Stock Table" section for Stock Data details on
            May 15 after entering the company symbol.
          </h6>
        </form>
      </Container>
    </div>
  );
};

const Container = styled.div`
  background: #86c8bc;
  height: 100vh;
  width: 100vw;
`;

export default Home;
