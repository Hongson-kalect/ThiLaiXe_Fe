import { Button, Col, Input, InputNumber, Row } from "antd";
import { useState, useMemo, useEffect } from "react";
import { CustomTitle } from "src/components/CustomText/CustomText";
import Layout, { CustomCol } from "src/components/Layout/Layout";
import { QuestionType } from "src/interfaces/question.type";
import { QuestionItem } from "src/pages/startExam/components/questionItem";
import { TrainingItem } from "./trainingItem";
import { ArrowRightOutlined } from "@ant-design/icons";

export interface ITrainingModalProps {
  questions: QuestionType[];
  anser: number;
  setAnser: React.Dispatch<React.SetStateAction<number>>;
  onCancel: () => void;
}

let TIMEOUT: NodeJS.Timeout;

export function TrainingModal({
  questions: propsQuestions,
  anser,
  setAnser,
  onCancel,
}: ITrainingModalProps) {
  const [isTrainingDone, setTrainingDone] = useState(false);

  const [questions, setQuestions] = useState([...propsQuestions]);
  const [remainQuestions, setRemainQuestion] = useState([...propsQuestions]);
  const [failQuestions, setFailQuestion] = useState<QuestionType[]>([]);

  const [trainingIndex, setTrainingIndex] = useState(1);
  const [question, setQuestion] = useState(questions[0]);
  const [time, setTime] = useState(1000);
  const [correctCount, setCorrectCount] = useState(0);

  const handleNextQuestion = () => {
    if (TIMEOUT) {
      clearTimeout(TIMEOUT);
    }
    if (trainingIndex === questions.length) setTrainingDone(true);
    else {
      nextQuestion();
    }
  };

  const remakeFailQuestion = () => {
    setQuestions([...failQuestions]);
  };

  const handleDone = () => {
    onCancel();
    setQuestions([...propsQuestions]);
  };

  const nextQuestion = () => {
    setTrainingIndex(trainingIndex + 1);
    remainQuestions.splice(remainQuestions.indexOf(question), 1);
    const randomIndex = Math.floor(Math.random() * remainQuestions.length);
    setQuestion(remainQuestions[randomIndex]);
    setAnser(-1);
  };

  useEffect(() => {
    setQuestions([...propsQuestions]);
  }, [propsQuestions]);

  useEffect(() => {
    if (anser > -1) {
      // remainQuestions.splice(remainQuestions.indexOf(question), 1);
      if (anser !== question?.correct) failQuestions.push(question);
      else if (trainingIndex === questions.length) {
        TIMEOUT = setTimeout(() => {
          setTrainingDone(true);
        }, time);
        setCorrectCount(correctCount + 1);
      } else {
        setCorrectCount(correctCount + 1);
        TIMEOUT = setTimeout(() => {
          nextQuestion();
        }, time);
      }
    }
    return () => clearTimeout(TIMEOUT);
  }, [anser]);

  useEffect(() => {
    setTrainingDone(false);
    setRemainQuestion([...questions]);
    setFailQuestion([]);

    setTrainingIndex(1);
    setAnser(-1);
    setQuestion(questions[0]);
    setCorrectCount(0);
  }, [questions]);

  // useEffect(() => {
  //   if (trainingIndex === questions.length + 1)
  // }, [trainingIndex]);

  return (
    <Layout className="training-modal" height="60vh">
      <div className="top">
        <Row style={{ width: "100%", alignItems: "center" }}>
          <Col span={8}>
            <p className="title">Luyện tập</p>
          </Col>
          <Col span={4}>{trainingIndex + "/" + questions?.length}</Col>
          <Col span={4}>{`Đúng ${correctCount}/${questions?.length}`}</Col>
          <Col span={8}>
            <span style={{ marginRight: "8px" }}>Chuyển tiếp:</span>

            <InputNumber
              value={time}
              min={0}
              max={10000}
              onChange={(e) => setTime(e || 0)}
            />
          </Col>
        </Row>
      </div>

      <div className="body">
        <div className="content">
          {isTrainingDone ? (
            <Row
              style={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <CustomCol span={24} justify="space-evenly">
                {failQuestions.length > 0 ? (
                  <Button
                    size="large"
                    type="primary"
                    onClick={remakeFailQuestion}
                  >
                    Làm lại câu sai
                  </Button>
                ) : null}
                <Button
                  size="large"
                  type="primary"
                  danger
                  ghost
                  onClick={handleDone}
                >
                  Xong
                </Button>
              </CustomCol>
            </Row>
          ) : (
            <TrainingItem
              anser={anser}
              setAnser={setAnser}
              question={question}
            />
          )}
        </div>
      </div>
      <div className="bottom">
        {anser > -1 ? (
          <>
            <div
              className={`concluse ${anser === question?.correct ? "ok" : ""}`}
            >
              {" "}
              {anser === question?.correct ? "Đúng rồi!" : "Sai nhá!"}
            </div>

            <Button size="large" type="primary" onClick={handleNextQuestion}>
              Tiếp
              <ArrowRightOutlined />
            </Button>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
