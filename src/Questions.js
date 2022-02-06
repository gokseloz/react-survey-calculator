/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    id: 0,
    unit: "Tables",
    title: "table",
    question: "How many tables do you have?",
    rangeStart: 1,
    rangeStop: 100,
    step: 1,
    toolTipSpace: 0,
  },
  {
    id: 1,
    unit: "Covers",
    title: "cover",
    question: "What's the maximum number of covers you can have?",
    rangeStart: 1,
    rangeStop: 500,
    step: 1,
    toolTipSpace: 0,
  },
  {
    id: 2,
    unit: "€",
    title: "revenue",
    question: "What is your annual revenue?",
    rangeStart: 10000,
    rangeStop: 10000000,
    step: 100,
    toolTipSpace: 0,
  },
  {
    id: 3,
    unit: "€",
    title: "wage",
    question:
      "What is the average hourly wage that you give to your Front-of-House staff?",
    rangeStart: 8,
    rangeStop: 14,
    step: 0.1,
    toolTipSpace: 0,
  },
  {
    id: 4,
    unit: "Hours",
    title: "minShift",
    question:
      "What is the minimum shift length that you regularly give out and staff would happily take?",
    rangeStart: 2,
    rangeStop: 10,
    step: 1,
    toolTipSpace: 0,
  },
  {
    id: 5,
    unit: "%",
    title: "labourPerc",
    question: "Can you give an indication of your current labour percentage?",
    rangeStart: 0,
    rangeStop: 100,
    step: 1,
    toolTipSpace: 0,
  },
  {
    id: 6,
    unit: "Front-of-house staff",
    title: "houseEmployee",
    question: "How many Front-of-House employees do you have?",
    rangeStart: 0,
    rangeStop: 60,
    step: 1,
    toolTipSpace: 0,
  },
];