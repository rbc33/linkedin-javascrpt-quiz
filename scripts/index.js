import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const questions = data.map(
	(q) =>
		new Question(q.topic, q.num, q.head, q.body, q.options, q.correct_answer)
)
console.log({ questions })

const quiz = new Quiz(questions, 300, 300)
quiz.shuffleQuestions()
let i = 0
for (let question of quiz.questions) {
	if (question && question.head) {
		console.log(question.head)
	}
	if (question.body) console.log(question.body)
	console.log({ i })
	i++
}
