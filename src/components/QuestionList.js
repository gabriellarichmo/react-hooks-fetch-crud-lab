import { useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"; 

function QuestionList( ) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((r) => r.json())
    .then(data => setQuestions(data))
    .catch((error) => setError(error.message));
  }, []);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error("Failed to delete question");
        }
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  return (
    <section>
      {error ? <p>{error}</p> : null}
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
        <QuestionItem key={question.id} question={question} onDelete={handleDeleteQuestion}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
