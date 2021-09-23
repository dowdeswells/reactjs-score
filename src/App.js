//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ScoreForm from './ScoreForm';
import EditTeams from './EditTeams';


const ScoresView = (props) => {
  return (
    <>
      {props.teams.map((t, ti) => (
        <div key={ti}>
          <span>{t}</span>
          <span>
            {props.scores[ti].map((s, si) => (
              <span key={si}><button onClick={ () => props.onCellClick(ti, si) }>{s}</button></span>
            ))}
          </span>
        </div>
      ))}
    </>
  );
}


const ScoreCard = () => {
  const [gameRound, setGameRound] = useState(0);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamEditExpanded, setTeamEditExpanded] = useState(true);

  const applyTeams = (newTeams) => {
    
    const newScores = [];
    newTeams.map((t, i) => {
      if (scores.length > i) {
        newScores.push(scores[i]);
      } else {
        const arr = Array.apply(null, Array(gameRound)).map(function (x, i) { return 0; });
        newScores.push(arr);
      }
    });
    
    setTeams(newTeams);
    setScores(newScores);
    shrinkTeams();
  }

  const shrinkTeams = () => {
    setTeamEditExpanded(false);
  }

  const addScore = (score) => {
    const newScores = [...scores];
    newScores[teamIndex][scoreIndex] = score;
    setScores(newScores);
  }

  const cellClickEdit = (ti, si) => {
    setTeamIndex(ti);
    setScoreIndex(si);
  }

  const startNextRound = () => {
    const nextRound = gameRound + 1;
    const newScores = [];
    teams.map((t, i) => {
      const teamScore = [...scores[i], 0]
      newScores.push(teamScore);
    });
    setScores(newScores)
    setGameRound(nextRound);
  }

  return (
    <div>
      {teamEditExpanded ?
        <EditTeams
          teams={teams}
          onOk={applyTeams}
          onCancel={shrinkTeams}
        />
        :
        <button onClick={() => setTeamEditExpanded(true)}>Edit Teams</button>
      }

      {teams.length > 0 ?
        <div>
          <ScoresView
            teams={teams}
            scores={scores}
            onCellClick={cellClickEdit}
          />
          {gameRound > 0 ?
            <div>
              <ScoreForm addScore={addScore} score={scores[teamIndex][scoreIndex]}></ScoreForm>
            </div>
            : <div>You need to start the game</div>
          }

        </div>
        :
        <div>You need at least 1 team</div>
      }

      <p></p>
      <button onClick={startNextRound}>Next Round</button>
    </div>);
}


const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/editTeams">Edit Teams</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/editTeams">
            <EditTeams />
          </Route>
          <Route path="/">
            <ScoreCard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const App = () => {


  return (
    <>

      <ScoreCard />
    </>
  );
}

export default App;
