import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const questions = data.map(
	(q) =>
		new Question(q.topic, q.num, q.head, q.body, q.options, q.correct_answer)
)

const quiz = new Quiz(questions, 300, 300)
quiz.filterQuestionsByTopic('HTML')
quiz.shuffleQuestions()

// Get the questions list element
const ul = document.querySelector('.question')
if (!ul) {
	console.error('Questions container not found')
	throw new Error('Questions container not found')
}

// Render each question
quiz.questions.forEach((question, i) => {
	const li = document.createElement('li')

	// Add question header
	const head = document.createElement('h3')
	head.textContent = question.head
	li.appendChild(head)

	// Add question body if it exists
	if (question.body) {
		const bodyElem = document.createElement('div')
		bodyElem.innerHTML = question.body
		li.appendChild(bodyElem)
	}

	// Add options if they exist
	const optionsList = document.createElement('ul')
	question.options.forEach((option) => {
		const optionItem = document.createElement('li')
		optionItem.textContent = option
		optionsList.appendChild(optionItem)
	})
	li.appendChild(optionsList)

	ul.appendChild(li)
})
