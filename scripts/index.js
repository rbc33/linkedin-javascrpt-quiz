import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const questions = data
	.map((q) => {
		if (!q.body) {
			return new Question(q.topic, q.num, q.head, q.options, q.correct_answer)
		}
		return null
	})
	.filter((q) => q !== null)

const quiz = new Quiz(questions, 300, 300)
quiz.filterQuestionsByTopic('HTML')
quiz.shuffleQuestions()

const ul = document.querySelector('.question')

quiz.questions.forEach((question, i) => {
	const li = document.createElement('li')

	const head = document.createElement('h3')
	head.textContent = question.head
	li.appendChild(head)

	const optionsList = document.createElement('ul')
	question.options.forEach((option) => {
		const optionInput = document.createElement('input')
		optionInput.type = 'radio'
		optionInput.name = `question-${i}`
		optionInput.value = option
		optionInput.id = i
		optionInput.classList.add('choice')
		const optionLabel = document.createElement('label')
		optionLabel.textContent = option
		optionsList.appendChild(optionInput)
		optionsList.appendChild(optionLabel)
		const br = document.createElement('br')
		optionsList.appendChild(br)
		optionInput.addEventListener('click', () => {
			if (optionInput.value === question.correct_answer) {
				optionInput.classList.add('correct')
				console.log('correct')
			} else {
				optionInput.classList.remove('correct')
				console.log('wrong')
			}
		})
	})
	li.appendChild(optionsList)

	ul.appendChild(li)
})
const answers = document.querySelectorAll('inputs')
