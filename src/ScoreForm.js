import { useState, useEffect } from 'react';

const ScoreForm = (props) => {

    const [scoreText, setScoreText] = useState('');

    useEffect(() => {
        const displayValue = props.score === 0 ? '' : props.score.toString();
        setScoreText(displayValue);
    }, [props.score]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = parseInt(scoreText);
        if (!isNaN(v)) {
            props.addScore(v);
            setScoreText('');
        }
    }

    const copyScore = (e) => {
        const text = e.target.value;
        setScoreText(text);
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
               
                <input
                    name='score'
                    type='text'
                    value={scoreText}
                    onChange={e => copyScore(e)} />
                <input
                    type='submit'
                    value='Ok'
                />
            </div>

        </form>
    );
}

export default ScoreForm;