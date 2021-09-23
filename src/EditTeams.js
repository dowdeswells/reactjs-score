import { useState, useEffect } from 'react';

const EditTeams = (props) => {

    const [teams, setTeams] = useState([]);
    useEffect(() => {
        setTeams([...props.teams]);
    }, [props.teams]);

    const copyTeam = (i, e) => {
        const newTeams = [...teams];
        newTeams[i] = e.target.value;
        setTeams(newTeams);
    }

    const addTeam = () => {
        setTeams([...teams, '']);
    }

    const onOk = () => {
        props.onOk(teams);
    }


    return (
        <>
            <button onClick={addTeam}>New Team</button>
            <button onClick={onOk}>Ok</button>
            <button onClick={props.onCancel}>Cancel</button>
            {teams.map((s, index) => (
                <div key={index}>
                    <input
                        name='score'
                        type='text'
                        value={teams[index]}
                        onChange={e => copyTeam(index, e)} />
                </div>
            ))}
        </>
    );
}

export default EditTeams;