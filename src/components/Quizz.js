import { useState, useEffect } from 'react';


function Quizz({ qs, category }) {
  const [questions, setQuestions] = useState([]);
  const [round, setRound] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [questionsLeft, setQuestionsLeft] = useState(0);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [attempt, setAttempt] = useState('');
  const [correct, setCorrect] = useState('');

  useEffect(() => {
    setQuestions(qs);
  }, [qs]);

  // Replace One Word In The Sentence With An Input
  const replaceWordWithInput = (text) => {
    const textArr = text.split(' ');
    // Get a random word from the current sentence. 
    const randomNum = Math.floor(Math.random() * textArr.length);
    let gerWord = textArr[randomNum];
    // Check Each Word For ? And Trim
    if (gerWord.includes('?')) gerWord = gerWord.replace('?', '');
    // Check Each Word For . And Trim
    if (gerWord.includes('.')) gerWord = gerWord.replace('.', '');
    // Create the input 
    const span = document.createElement('span');
    const input = document.createElement('input');
    input.classList.add('js-wordInput');
    input.style.width = `${gerWord.length + 2}ch`;
    span.appendChild(input);
    // Replace the chosen word in the array with the input
    textArr.splice(randomNum, 1, span.outerHTML);
    return (
      <div dangerouslySetInnerHTML={{ __html: textArr.join(' ') }}></div>
    );
  };

  const handleAnswer = () => {
    console.log("Trying to get the correct answer", correct);
    setRound(round + 1);
    return;
  }

  return (
    <div className="content">
      <h1 className="category" id="category">
        <span style={{ background: "#8A84E2", color: "#FFF", padding: "0.75rem 4rem", border: "3px solid #000", borderRadius: "180px", display: "inline-block" }}>{category}</span>
      </h1>

      {questions.length === 0 ? 'loading' : (
        <>
          <div className="round js-round">Round <span className="round-num">{round}</span> of <span className="round-num">{questions.length}</span>
          </div>
          <div className="panel js-panel">
            <div className="panel__card js-panelOne">{questions[round].english}</div>
            <div className="panel__card js-panelTwo">{replaceWordWithInput(questions[round].german)}</div>
          </div>
        </>
      )}
      <div class="panel__card js-resultCard">
        <h2 class="ff-heading">success!</h2>
        <p><span class="highlighted correct">FOOBAR!</span> is correct.</p>
      </div>
      <div className="js-panelSubmit" style={{ textAlign: "center" }}>
        <button className="panel__button" type="submit" value={attempt} onChange={(e) => setAttempt(e.target.value)} onClick={handleAnswer}>Answer!</button>
      </div>
    </div>
  )
}
export default Quizz;

/* 
  Click answer!
  Check the CORRECT & ATTEMPT
  Display the results
  Change Button so it shows next round 
*/