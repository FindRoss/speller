import './App.css';
import { useState, useEffect } from 'react';

import { qs } from './Questions';
import { CATEGORIES } from './Categories';
import Header from './components/Header';



// Add Next Catefory or New Round
// Add End of Game Summary
// Fix Navigation (and remove one State.)

// Show Start
// Show Rounds
// Show Complete


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [questions, setQuestions] = useState(qs['general']);
  const [category, setCategory] = useState('general');

  const [round, setRound] = useState(0);
  const [attempt, setAttempt] = useState('');
  const [correct, setCorrect] = useState('');

  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState(true);
  const [roundComplete, setRoundComplete] = useState(false);

  const [englishSentence, setEnglishSentence] = useState('');
  const [germanSentence, setGermanSentence] = useState('');
  const [germanInputSentence, setGermanInputSentence] = useState('');


  useEffect(() => {
    setQuestions(qs[category]);
  }, [category]);

  function handleRoundChange() {
    // END GAME WHEN
    if (round === questions.length) {
      setShowResult(false);
      setRoundComplete(true);
      return;
    }

    // IF GAME STILL GOING, CHANGE ROUND
    setRound((round) => round + 1);

    setEnglishSentence(questions[round].english)
    setGermanSentence(questions[round].german)
    const { output, gerWord } = replaceWordWithInput(questions[round].german);
    setGermanInputSentence(output);
    setCorrect(gerWord);
    setResultType(false);
  }

  function handleNextQuestion() {
    setShowResult(false);
    handleRoundChange()
  }

  function handleAnswer() {
    // useRef is better for this I think?
    // https://www.upbeatcode.com/react/how-to-use-queryselector-in-react/
    let answer = document.querySelector('.attempt').value
    setAttempt(answer);

    setResultType(answer === correct);
    setShowResult(true);
  }

  function handleReplayRound() {
    setShowResult(false);
    setRoundComplete(false);
    setRound(0);
  }

  function handleNextRound() {
    console.log('handleNEXTRound');
  }

  const menuElement = <MenuItems setRound={setRound} category={category} setCategory={setCategory} setMenuOpen={setMenuOpen} setShowResult={setShowResult} />;

  return (
    <div className="">
      <Header setMenuOpen={setMenuOpen} />
      <div className={`sidebar ${menuOpen ? 'sidebar-show' : null}`}>
        <div className="sidebar-content">
          {menuElement}
        </div>
      </div>
      <div className="wrapper">
        <main>
          <div className="sidebar-desktop">
            {menuElement}
          </div>
          <div className="content">
            <div className="panel__wrapper">
              {/* HEADING */}
              <div className="category__header" id="category">
                <h1 className="category__title" style={{ backgroundColor: CATEGORIES.find(cat => cat.name === category).color }}>{category}</h1>
                <div className="round">
                  {(round === 0) ? `${questions.length} Questons` : `Question ${round} of ${questions.length}`}
                </div>
              </div>
              {/* START THE ROUND */}
              {
                (round === 0) && (
                  <>
                    <div className="panel__card">
                      <h2 className="ff-heading">{CATEGORIES.find(cat => cat.name === category).subtitle}</h2>
                      <p>{CATEGORIES.find(cat => cat.name === category).description}</p>
                    </div>
                    <div className="panel__btn-wrapper">
                      <button className="panel__btn" onClick={handleRoundChange}>Start Round</button>
                    </div>
                  </>
                )
              }
              {/* QUIZZ */}
              {
                (round !== 0 && !roundComplete && !showResult) && (
                  <>
                    <div className="panel__card"><span className="lang">English</span>{englishSentence}</div>
                    <div className="panel__card"><span className="lang">German</span>{germanInputSentence}</div>
                    {/* SUBMIT BUTTON */}
                    <div className="panel__btn-wrapper">
                      <button className="panel__btn" type="submit" onClick={handleAnswer}>Answer</button>
                    </div>
                  </>
                )
              }
              {/* SUCCESS/FAIL MESSAGE */}
              {showResult ? (
                <>
                  <div className="panel__card">
                    {
                      resultType ? (
                        <>
                          <h2 className="ff-heading">Correct!</h2>
                          <p><span className="highlighted correct">{attempt}</span> is correct.</p>
                        </>
                      ) : (
                        <>
                          <h2 className="ff-heading">Wrong!</h2>
                          <p>You answered <span className="highlighted incorrect">{attempt}</span> but we were looking for <span className="highlighted correct">{correct}</span>.</p>
                        </>
                      )
                    }
                  </div>
                  <div className="panel__card"><span className="lang">English</span>{englishSentence}</div>
                  <div className="panel__card"><span className="lang">German</span>{germanSentence}</div>
                  <div className="panel__btn-wrapper">
                    {(round - 2) === questions.length ? <button className="panel__btn" type="submit" onClick={handleNextQuestion}>Next Question</button> : <button className="panel__btn" type="submit" onClick={handleNextQuestion}>Next Question</button>}
                  </div>
                </>
              ) : null}
              {
                roundComplete ? (
                  <>
                    <div className="panel">
                      <div className="panel__card">Round complete!</div>
                      <div className="two-btn">
                        <button className="panel__btn replay-round" onClick={handleReplayRound}>Replay Round</button>
                        <button className="panel__btn next-round" onClick={handleNextRound}>Next Round</button>
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;


function MenuItems({ category, setCategory, setRound, setMenuOpen, setShowResult }) {

  function handleCategoryClick(catName) {
    setCategory(catName);
    setShowResult(false);
    setRound(0);
    setMenuOpen(false);
  }

  return (
    <ul className="sidebar-pills">
      {CATEGORIES.map((cat) => (
        <li key={cat.name}>
          <span className={`pill-title ${(cat.name === category) ? ' active' : null}`} onClick={() => handleCategoryClick(cat.name)} style={{ backgroundColor: cat.color }}>{cat.name} ({qs[cat.name].length})</span>
        </li>
      ))}
    </ul>
  )
};

// Replace One Word In The Sentence With An Input
function replaceWordWithInput(text) {
  const textArr = text.split(' ');
  // Get a random word from the current sentence. 
  const randomNum = Math.floor(Math.random() * textArr.length);
  let gerWord = textArr[randomNum];
  // Check Each Word For ? And Trim
  if (gerWord.includes('?')) gerWord = gerWord.replace('?', '');
  // Check Each Word For . And Trim
  if (gerWord.includes('.')) gerWord = gerWord.replace('.', '');
  // Create the input 
  let span = document.createElement('span');
  let input = document.createElement('input');
  input.classList.add('attempt');
  input.style.width = `${gerWord.length + 2}ch`;
  span.appendChild(input);
  // Replace the chosen word in the array with the input
  textArr.splice(randomNum, 1, span.outerHTML);
  const output = <div dangerouslySetInnerHTML={{ __html: textArr.join(' ') }}></div>;
  return { output, gerWord }
};

/* 
  Click answer!
  Check the CORRECT & ATTEMPT
  Display the results
  Change Button so it shows next round 
*/
