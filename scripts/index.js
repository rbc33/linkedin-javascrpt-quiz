import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const ul = document.querySelector('.question')
const topic = document.querySelector('.topics')
topic.style.display = 'block'
ul.style.display = 'none'

const selectedTopics = new Set()

// Create start button
const startButton = document.createElement('button')
startButton.textContent = 'Start Quiz'
startButton.classList.add('start-button')

// Add start button after topics
topic.after(startButton)

const topics = ['CSS', 'HTML', 'JavaScript']
topics.forEach((t, i) => {
	const input = document.createElement('input')
	const label = document.createElement('label')
	const br = document.createElement('br')

	input.type = 'checkbox'
	input.value = t
	input.id = t
	input.name = t
	label.textContent = t
	label.setAttribute('for', input.id)
	topic.appendChild(input)
	topic.appendChild(label)
	topic.appendChild(br)
	console.log({ input })
	input.addEventListener('change', (e) => {
		if (e.target.checked) {
			selectedTopics.add(e.target.value)
		} else {
			selectedTopics.delete(e.target.value)
		}
	})
})
startButton.addEventListener('click', () => {
	if (selectedTopics.size > 0) {
		// Filter questions by selected topics
		quiz.filterQuestionsByTopic(...selectedTopics)
		quiz.shuffleQuestions()

		// Toggle visibility
		topic.style.display = 'none'
		ul.style.display = 'block'
		startButton.style.display = 'none'
	}
})

const questions = data
	.map((q) => {
		if (!q.body) {
			return new Question(q.topic, q.head, q.options, q.correct_answer)
		}
		return null
	})
	.filter((q) => q !== null)

const quiz = new Quiz(questions, 300, 300)
quiz.filterQuestionsByTopic('HTML')
quiz.shuffleQuestions()

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
				optionsList.classList.add('correct')
				console.log('correct')
			} else {
				optionsList.classList.remove('correct')
				console.log('wrong')
			}
		})
	})
	li.appendChild(optionsList)

	ul.appendChild(li)
})
const answers = document.querySelectorAll('inputs')
