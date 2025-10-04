import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const questions = data
	.map((q) => {
		if (!q.body) {
			return new Question(q.topic, q.head, q.options, q.correct_answer)
		}
		return null
	})
	.filter((q) => q !== null)

const quiz = new Quiz(questions, 300, 300)

const ul = document.querySelector('.question')
const topic = document.querySelector('.topics')
topic.style.display = 'block'
ul.style.display = 'none'

const selectedTopics = new Set()

const dialog = document.getElementById('favDialog')

// Create start button
const startButton = document.createElement('button')
startButton.textContent = 'Start Quiz'
startButton.classList.add('start-button')

// Add start button after topics
topic.after(startButton)

const topics = ['CSS', 'HTML', 'JavaScript']
topics.forEach((t) => {
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
	input.addEventListener('change', () => {
		if (input.checked) {
			selectedTopics.add(input.value)
		} else {
			selectedTopics.delete(input.value)
		}
	})
})
let answered = 0
startButton.addEventListener('click', () => {
	if (selectedTopics.size > 0) {
		// Filter questions by selected topics
		quiz.filterAndShuffle(...selectedTopics)

		// Render filtered questions
		quiz.questions.forEach((question, i) => {
			const li = document.createElement('li')

			const head = document.createElement('h3')
			head.textContent = `${i + 1} - ${question.head}`
			li.appendChild(head)

			const optionsList = document.createElement('ul')
			question.options.forEach((option, index) => {
				const div = document.createElement('div')
				const optionInput = document.createElement('input')
				optionInput.type = 'radio'
				optionInput.name = `question-${i}`
				optionInput.value = option
				optionInput.id = `${index}-${i}`
				optionInput.classList.add('choice')
				const optionLabel = document.createElement('label')
				optionLabel.textContent = option
				optionLabel.setAttribute('for', optionInput.id)

				div.appendChild(optionInput)
				div.appendChild(optionLabel)
				const br = document.createElement('br')
				div.appendChild(br)
				optionsList.appendChild(div)
				optionInput.addEventListener('click', () => {
					if (optionInput.value === question.correct_answer) {
						optionsList.classList.add('correct')
						console.log('correct')
					} else {
						optionsList.classList.remove('correct')
						console.log('wrong')
						div.style.backgroundColor = 'tomato'
					}
					const inputs = li.querySelectorAll('.choice')
					inputs.forEach((op) => {
						op.disabled = true
						if (op.value === question.correct_answer)
							op.parentNode.style.backgroundColor = '#7CFC00'
					})
					answered++
					const correct = document.querySelectorAll('.correct')
					if (answered === 25) {
						// alert(`You have ${correct.length} of 25 and ${answered}`)
						const p = dialog.querySelector('.result')
						p.textContent = `You have ${correct.length} correct of 25`
						dialog.showModal()
					}
				})
			})
			li.appendChild(optionsList)
			ul.appendChild(li)
		})

		// Toggle visibility
		topic.style.display = 'none'
		ul.style.display = 'block'
		startButton.style.display = 'none'
	}
})
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => {
	answered = 0
	topic.style.display = 'block'
	ul.style.display = 'none'
	startButton.style.display = 'block'
	dialog.close()
	ul.innerHTML = ''
})
