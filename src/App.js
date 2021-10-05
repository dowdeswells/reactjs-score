import { useState, useReducer } from 'react';
import ScoreForm from './ScoreForm';
import EditTeams from './EditTeams';
import { ScoresReducer, initialState } from './ScoresReducer';

const ScoresView = (props) => {
  return (
    <>
      {props.teams.map((t, ti) => (
        <div key={ti}>
          <span>{t.name}</span>
          <span>
            {t.scores.map((s, si) => (
              <span key={si}><button onClick={ () => props.onCellClick(ti, si) }>{s}</button></span>
            ))}
          </span>
        </div>
      ))}
    </>
  );
}


const ScoreCard = () => {

  const [scoreIndex, setScoreIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [teamEditExpanded, setTeamEditExpanded] = useState(true);


  const [state, dispatch] = useReducer(
    ScoresReducer,
    initialState
  );


  const applyTeams = (newTeams) => {
    
    dispatch({type:'ApplyTeamNames', teamNames:newTeams});
    shrinkTeams();
  }

  const shrinkTeams = () => {
    setTeamEditExpanded(false);
  }

  const editScore = (score) => {
    dispatch({
      type: 'EditScore',
      teamIndex: teamIndex,
      scoreIndex: scoreIndex,
      score: score
    });
  }

  const cellClickEdit = (ti, si) => {
    setTeamIndex(ti);
    setScoreIndex(si);
  }

  const startNextRound = () => {
    dispatch({ type: 'NextGameRound' });
  }

  return (
    <div>
      {teamEditExpanded ?
        <EditTeams
          teams={state.teams}
          onOk={applyTeams}
          onCancel={shrinkTeams}
        />
        :
        <button onClick={() => setTeamEditExpanded(true)}>Edit Teams</button>
      }

      {state.teams.length > 0 ?
        <div>
          <ScoresView
            teams={state.teams}
            onCellClick={cellClickEdit}
          />
          {state.gameRound > 0 ?
            <div>
              <ScoreForm addScore={editScore} score={state.teams[teamIndex].scores[scoreIndex]}></ScoreForm>
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

const App = () => {


  return (
    <>

      <ScoreCard />
    </>
  );
}

export default App;
