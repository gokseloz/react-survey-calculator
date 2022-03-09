/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useLayoutEffect } from "react";
import "./App.css";
import Pagination from "./components/Pagination/Pagination";
import { NextButton, PrevButton } from "./components/Buttons/Button";
import Questions from "./Questions";
import { numberWithCommas } from "./utils/numberWithCommas";
import QuizHeader from "./components/QuizHeader/QuizHeader";

function App() {
  const [questions] = useState(Questions);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [value, setValue] = useState(1);
  const [reachedMax, setReachedMax] = useState(false);
  const [reachedMin, setReachedMin] = useState(true);
  const [toolTipSpace, setToolTipSpace] = useState(0);
  const [data, setData] = useState({
    table: 1,
    cover: 1,
    revenue: 10000,
    wage: 8,
    minShift: 2,
    labourPerc: 0,
    houseEmployee: 0,
  });

  const { id, unit, question, rangeStart, rangeStop, step } =
    questions[questionNumber];

  const tooltipRef = useRef();

  useLayoutEffect(() => {
    updateValue();
    updateMinMaxVisibility();
    updateToolTipPosition();
  }, [questionNumber, value]);

  const updateValue = () => {
    questions.map((q) => {
      if (q.id === questionNumber) {
        return setValue(data[q.title]);
      } else {
        return "";
      }
    });
  };

  // Visibility of the max and min values at the edges
  const updateMinMaxVisibility = () => {
    value >= rangeStop ? setReachedMax(true) : setReachedMax(false);
    value <= rangeStart ? setReachedMin(true) : setReachedMin(false);
  };

  const updateToolTipPosition = () => {
    questions.map((q) => {
      if (q.id === questionNumber) {
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
    setValue(value);

    e.target.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";

    // Calculate toolTip's position
    const diameterOfInputThumb = 42;
    const radiusOfInputThumb = diameterOfInputThumb / 2;
    const inputWidth = e.target.getBoundingClientRect().width;
    const widthOfToolTip = tooltipRef.current.getBoundingClientRect().width;
    const gapDistance =
      (inputWidth - diameterOfInputThumb) / (rangeStop - rangeStart);
    const factor = value - rangeStart;
    const halfOfTheToolTipWidth = widthOfToolTip / 2;
    const spaceFromLeft =
      gapDistance * factor - halfOfTheToolTipWidth + radiusOfInputThumb;
    setToolTipSpace(spaceFromLeft);

    questions.map((q) => {
      if (q.id === questionNumber) {
        setData({
          ...data,
          [q.title]: value,
        });
        q.toolTipSpace = spaceFromLeft;
      }
    });
  };

  return (
    <main className="main">
      <div className="container">
        <section className="quiz-wrapper">
          <div className="quiz" key={id}>
            <QuizHeader id={id} question={question} unit={unit} value={value} />
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
                ref={tooltipRef}
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
          <PrevButton
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
          />
          <Pagination
            questions={questions}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
          />
          <NextButton
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            questions={questions}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
