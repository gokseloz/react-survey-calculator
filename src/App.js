/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useLayoutEffect } from "react";
import "./App.css";
import Questions from "./Questions";
import { numberWithCommas } from "./utils/numberWithCommas";

function App() {
  const [questions] = useState(Questions);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [value, setValue] = useState(1);
  const [reachedMax, setReachedMax] = useState(false);
  const [reachedMin, setReachedMin] = useState(true);
  const [toolTipSpace, setToolTipSpace] = useState(0);
  const [data, setData] = useState({
    table: 0,
    cover: 0,
    revenue: 0,
    wage: 0,
    minShift: 0,
    labourPerc: 0,
    houseEmployee: 0,
  });

  const { id, unit, question, rangeStart, rangeStop, step } =
    questions[numberOfQuestion];
  const spanRef = useRef();

  useLayoutEffect(() => {
    setValue(rangeStart);
    setReachedMin(true);
    updateValue();
    updateToolTipPosition();
  }, [numberOfQuestion]);

  const updateValue = () => {
    questions.map((q) => {
      if (q.id === numberOfQuestion && data[q.title] !== 0) {
        return setValue(data[q.title]);
      } else {
        return "";
      }
    });
  };

  const updateToolTipPosition = () => {
    questions.map((q) => {
      if (q.id === numberOfQuestion) {
        return setToolTipSpace(q.toolTipSpace);
      } else {
        return "";
      }
    });
  };

  const handleChange = (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const value = e.target.value;

    e.target.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";

    setValue(value);

    // Calculate toolTip's position
    const diameterOfInputThumb = 42;
    const radiusOfInputThumb = diameterOfInputThumb / 2;
    const inputWidth = e.target.getBoundingClientRect().width;
    const widthOfToolTip = spanRef.current.getBoundingClientRect().width;
    const gapDistance =
      (inputWidth - diameterOfInputThumb) / (rangeStop - rangeStart);
    const factor = value - rangeStart;
    const halfOfTheToolTipWidth = widthOfToolTip / 2;
    const spaceFromLeft =
      gapDistance * factor - halfOfTheToolTipWidth + radiusOfInputThumb;
    setToolTipSpace(spaceFromLeft);

    // Appearing of the max and min values at the edges
    value >= rangeStop ? setReachedMax(true) : setReachedMax(false);
    value <= rangeStart ? setReachedMin(true) : setReachedMin(false);

    questions.map((q) => {
      if (q.id === numberOfQuestion) {
        return setData({
          ...data,
          [q.title]: value,
        });
      } else {
        return;
      }
    });
    questions.map((q) => {
      if (q.id === numberOfQuestion) {
        q.toolTipSpace = spaceFromLeft;
      }
    });
  };

  const nextQuestion = () => {
    if (numberOfQuestion === questions.length - 1) {
      setNumberOfQuestion(questions.length - 1);
    } else {
      setNumberOfQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (numberOfQuestion === 0) {
      setNumberOfQuestion(0);
    } else {
      setNumberOfQuestion((prevQuestion) => prevQuestion - 1);
    }
  };
  return (
    <main className="main">
      <div className="container">
        <section className="quiz-wrapper">
          <div className="quiz" key={id}>
            <div className="quiz-header">
              <div className="quiz-header-question">
                <p>Question {id}</p>
                <p>{question}</p>
              </div>
              <div className="quiz-header-value">
                <span className="question-value">
                  {numberWithCommas(value)}
                </span>
                <p>{unit}</p>
              </div>
            </div>
            <div className="quiz-body">
              <input
                className="inputRange"
                type="range"
                id={unit}
                name={unit}
                min={rangeStart}
                max={rangeStop}
                step={step}
                onChange={handleChange}
                value={value}
                style={{
                  backgroundSize: `${
                    ((value - rangeStart) * 100) / (rangeStop - rangeStart)
                  }%`,
                }}
              />
              <span
                className="toolTip"
                ref={spanRef}
                style={{ transform: `translateX(${toolTipSpace}px)` }}
              >
                {numberWithCommas(value)}
              </span>
              <div className="minMaxDisplay">
                <span className="minDisplay">
                  {reachedMin ? "" : numberWithCommas(rangeStart)}
                </span>
                <span className="maxDisplay">
                  {reachedMax ? "" : numberWithCommas(rangeStop)}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="quiz-pagination">
          <button className="prevBtn" onClick={prevQuestion}>
            Previous Question
          </button>
          <div className="paginationBtns">
            {questions.map((q, index) => {
              return (
                <button
                  className={`paginationBtn ${
                    index === numberOfQuestion && "active-btn"
                  }`}
                  key={q.id}
                  onClick={() => setNumberOfQuestion(index)}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <button className="nextBtn" onClick={nextQuestion}>
            Next Question
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;
