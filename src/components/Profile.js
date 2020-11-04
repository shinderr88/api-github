import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Image, Table, InputGroup, FormControl } from "react-bootstrap";

function Profile() {

  const [userData, setUserData] = useState({});
  const [repoData, setRepoData] = useState({});

  const [showRepoDashboard, setShowRepoDashboard] = useState(false);

  const [commitsData, setCommitsData] = useState([]);
  const [forksData, setForksData] = useState([]);
  const [issuesData, setIssuesData] = useState([]);

  const [username, setUsername] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");


  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    setShowRepoDashboard(false);
    setUserData({});
    setRepoData([]);
    setCommitsData([]);
    setForksData([]);
    setIssuesData([]);

    const profile = await (await fetch(`https://api.github.com/users/${username}`)).json();

    setUserData(profile);

    if (profile.login) {
      const repoDATA = await (await fetch(
        `https://api.github.com/users/${username}/repos`
      )).json();
      setRepoData(repoDATA);
    }
  };

  const getCommitDetails = async (repo) => {
    setSelectedRepo(repo.name);
    setShowRepoDashboard(true)
    ///repos/:owner/:repo/commits
    let repoCommitsData = await (await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)).json();

    let repoForksData = await (await fetch(`https://api.github.com/repos/${username}/${repo.name}/forks`)).json();

    let repoIssuesData = await (await fetch(`https://api.github.com/repos/${username}/${repo.name}/issues`)).json();

    setCommitsData(repoCommitsData);
    setForksData(repoForksData);
    setIssuesData(repoIssuesData);

  }

  return (
    <div>
      <InputGroup className="mb-3" onChange={onChangeHandler}>
        <FormControl
          placeholder="Enter Your Username Here"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <div className="mb-2">
        <Button
          variant="primary"
          size="lg"
          block
          type="submit"
          onClick={submitHandler}
        >
          Search
        </Button>
      </div>

      {userData.login &&
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Login</th>
                <th>Avator</th>
                <th>Name</th>
                <th>Followers</th>
                <th>Following</th>
                <th>Repositories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.login}</td>
                <td>
                  <Image src={userData.avatar_url} alt="" roundedCircle />
                </td>
                <td>{userData.name}</td>
                <td>{userData.followers}</td>
                <td>{userData.following}</td>
                <td>
                  {repoData && repoData.length > 0 && repoData.map((item) => {
                    return <div key={item.id}>
                      <li key={item.id}>
                        <a style={{ cursor: "pointer" }} onClick={() => { getCommitDetails(item) }}>  {item.name}</a>
                      </li>
                    </div>
                  })
                  }
                  {
                    (!repoData || repoData.length == 0) && <span>Repositories not found.</span>
                  }
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      }
      {
        !userData.login && <span> User not found</span>
      }


      {showRepoDashboard &&
        <div> <div className="row">
          <div className="col-12">
            <span style={{ fontSize: "24px" }}>{selectedRepo}</span>
          </div>
        </div>
          <div className="row">
            <div className="col-4">
              Commits Count
        </div>
            <div className="col-4">
              Fork Count
        </div>
            <div className="col-4">
              Issues Open
        </div>
          </div>
          <div className="row">
            <div className="col-4">
              {commitsData.length}
            </div>
            <div className="col-4">
              {forksData.length}
            </div>
            <div className="col-4">
              {issuesData.length}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Profile;
