
const initialState = {

    teams: [],
    gameRound: 0,
    currentTeam: 0,
};

const applyTeamNames = (teams, teamNames, noOfScores) => {
    return teamNames.map((t, i) => {
        const newteam = {
            name: t,
            scores: [],
        };
        if (teams.length > i) {
            newteam.scores = [...teams[i].scores];
        } else {
            newteam.scores = Array.apply(null, Array(noOfScores)).map(function (x, i) { return 0; });
        }
        return newteam;
    });
}

const initGameRoundScores = (teams) => {
    return teams.map((t, i) => {
        return {...t, scores:[...t.scores, 0]}
    });
}

const editScore = (teams, teamIndex, scoreIndex, score) => {
    return teams.map((t, i) => {
        const newteam = {
            ...t,
            scores: [...teams[i].scores],
        };
        if (i === teamIndex) {
            newteam.scores[scoreIndex] = score;
        }
        return newteam;
    });
}

const ScoresReducer = (state, action) => {

    switch (action.type) {
        case 'ApplyTeamNames':
            return {
                ...state,
                teams: applyTeamNames(state.teams, action.teamNames, state.gameRound)
            }
        case 'NextGameRound':
            const nextRound = state.gameRound + 1;
            return {
                ...state,
                teams: initGameRoundScores(state.teams),
                gameRound: nextRound,
            }
        case 'EditScore':
            return {
                ...state,
                teams: editScore(state.teams, action.teamIndex, action.scoreIndex, action.score),
            }
        default:
            return state;
    }
}

export { ScoresReducer, initialState };