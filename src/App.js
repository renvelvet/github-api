import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

// import GithubProfile from "./page/GithubProfile/GithubProfile";

const Body = styled.div`
  font-family: "Noto Sans", sans-serif;
`;
const Input = styled.div`
  text-align: center;
  margin: 40px auto;

  & input {
    height: 30px;
    background-color: rgba(228, 227, 227, 0.4);
    border: 0;
    width: 20%;
    padding: 10px 20px;
  }
`;
const HeadProfile = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.div`
  & img {
    margin: 0 auto;
    border-radius: 50%;
    width: 170px;
    height: 170px;
    object-fit: cover;
  }
`;
const Bio = styled.div`
  margin: 10px auto;
  & h2,
  h3 {
    margin: 4px auto;
    text-align: center;
  }
  & h3 {
    font-weight: 300;
  }
`;
const Activity = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 30px;
  margin: 10px auto;
  border: 1px solid #abc2e8;
  width: 100%;

  & div {
    margin: 0 100px;
  }

  & h3 {
    margin: 4px auto;
    font-weight: 200;
  }

  & h3:nth-child(1) {
    font-weight: 700;
  }
`;

function App() {
  const [username, setusername] = useState("");
  const [dataUser, setdataUser] = useState({});

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setusername(event.target.value);
      console.log(username);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.github.com/users/${username}`;
      const response = await fetch(url);
      const result = await response.json();
      setdataUser(result);
    }
    fetchData();
  }, [username]);

  return (
    <Body>
      <Input>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Type a username and press Enter"
          // onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </Input>

      <HeadProfile>
        <Avatar>
          <img src={dataUser.avatar_url} alt="avatar" />
        </Avatar>
        <Bio>
          <h2>{dataUser.name}</h2>
          <h3>{dataUser.bio}</h3>
        </Bio>
        <Activity>
          <div>
            <h3>{dataUser.followers}</h3>
            <h3>Followers</h3>
          </div>
          <div>
            <h3>{dataUser.following}</h3>
            <h3>Following</h3>
          </div>
          <div>
            <h3>{dataUser.public_repos}</h3>
            <h3>Repository</h3>
          </div>
        </Activity>
      </HeadProfile>
    </Body>
  );
}

export default App;
