import React, {useState, useEffect} from 'react'
import useSound from "use-sound";
import play from "../mp3/play.mp3";
import wrong from "../mp3/wrong.mp3";
import correct from "../mp3/correct.mp3";
 function Trivia({
    data,
    setStop,
    QuestionNumber,
    setQuestionNumber
 }) {
    const [ Question, setQuestion ] = useState(null);
    const [ selectionAnswer, setSelectionAnswer ] = useState(null);
    const [ className, setClassName ] = useState("answer");
    
    const [ letsPlay] = useSound(play);
    const [ correctAnswer] = useSound(correct);
    const [ wrongAnswer] = useSound(wrong);

    useEffect(()=> {
        letsPlay();
    },[letsPlay]);

    useEffect(() => {
        setQuestion(data[QuestionNumber - 1]);
    }, [data, QuestionNumber]);

    const delay = ( duration, callback ) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (x) => {
        setSelectionAnswer(x);
        setClassName("answer active");
        delay(3000, () => {
            setClassName(x.correct? "answer correct" : "answer wrong");  
        });
        delay(5000, () => {
            if(x.correct) {
                correctAnswer();
                delay(1000, ()=> {
                setQuestionNumber((prev)=>prev + 1);
                setSelectionAnswer(null);
                });
            } else {
                wrongAnswer();
                delay(1000, ()=> {
                    setStop(true);
                })
            }
        });
    };

  return (
    <div className="trivia">
        <div className="question">
         {Question?.question}
        </div>
        <div className="answers">
            {Question?.answers.map( x =>(
            <div 
            className={selectionAnswer === x ? className : "answer"} 
            onClick={() => handleClick(x)}
            >
                {x.text}
            </div>
            ))}
        </div>
    </div>
  )
}
export default Trivia;
//npm install use-sound