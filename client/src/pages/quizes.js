import React, { useState } from "react";
import { Button, Modal, message } from "antd";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Quiz = () => {
  const [questions, setQuestions] = useState([
    {
      type: "multiple",
      difficulty: "easy",
      category: "Sports",
      question: "Which team won the Premier League in the 2015-2016 season after a remarkable run?",
      correct_answer: "Leicester City",
      incorrect_answers: ["Tottenham Hotspur", "Watford", "Stoke City"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Vehicles",
      question: "Which collision avoidance system is used by airplanes to avoid mid-air collisions?",
      correct_answer: "TCAS",
      incorrect_answers: ["GPWS", "OCAS", "TAWS"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "History",
      question: "Which African nation was most successful in resisting European colonization?",
      correct_answer: "Ethiopia",
      incorrect_answers: ["Côte d’Ivoire", "Congo", "Namibia"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Music",
      question: "Who is the lead vocalist of the band Coldplay?",
      correct_answer: "Chris Martin",
      incorrect_answers: ["Chris Isaak", "Chris Wallace", "Chris Connelly"],
    },
    {
      type: "boolean",
      difficulty: "easy",
      category: "Entertainment: Television",
      question: "Klingons express their emotions in art through opera and poetry.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Japanese Anime & Manga",
      question: "In Ms. Kobayashi's Dragon Maid, who serves as Kobayashi's maid?",
      correct_answer: "Tohru",
      incorrect_answers: ["Lucoa", "Kanna", "Elma"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Video Games",
      question: "Which was the most graphically violent game before the ESRB rating system was created?",
      correct_answer: "Mortal Kombat",
      incorrect_answers: ["Duke Nukem", "Resident Evil", "Doom"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Science: Mathematics",
      question: "What is the next prime number after 19?",
      correct_answer: "23",
      incorrect_answers: ["25", "21", "27"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "History",
      question: "When did the Battle of the Somme begin?",
      correct_answer: "July 1st, 1916",
      incorrect_answers: ["August 1st, 1916", "July 2nd, 1916", "June 30th, 1916"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Music",
      question: "Which band's albums include 'Back in Black' and 'Ballbreaker'?",
      correct_answer: "AC/DC",
      incorrect_answers: ["Iron Maiden", "Black Sabbath", "Metallica"],
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = () => {
    setIsModalVisible(true);
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setQuizCompleted(false);
  };

  const handleAnswerClick = (answer) => {
    const currentQuestion = questions[currentIndex];

    if (answer === currentQuestion.correct_answer) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizCompleted(true);
      setIsModalVisible(false);
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={startQuiz}>Start Quiz</Button>

      <Modal
        title={`Question ${currentIndex + 1}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <h3>{questions[currentIndex]?.question}</h3>
        {questions[currentIndex]?.type === "multiple" &&
          shuffleArray(questions[currentIndex]?.incorrect_answers.concat(questions[currentIndex]?.correct_answer))
            .map((answer, index) => (
              <Button key={index} onClick={() => handleAnswerClick(answer)} style={{ margin: "5px" }}>
                {answer}
              </Button>
            ))}
        {questions[currentIndex]?.type === "boolean" &&
          ["True", "False"].map((answer, index) => (
            <Button key={index} onClick={() => handleAnswerClick(answer)} style={{ margin: "5px" }}>
              {answer}
            </Button>
          ))}
      </Modal>

      {quizCompleted && (
        <Modal
          title="Quiz Completed"
          open={quizCompleted}
          onCancel={() => setQuizCompleted(false)}
          footer={[
            <Button key="restart" type="primary" onClick={restartQuiz}>
              Restart Quiz
            </Button>,
            <Button key="close" onClick={() => setQuizCompleted(false)}>
              Close
            </Button>,
          ]}
        >
          <p>You answered {correctCount} out of {questions.length} questions correctly!</p>
          <p>Incorrect answers: {wrongCount}</p>
        </Modal>
      )}
    </div>
  );
};

export default Quiz;
