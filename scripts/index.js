import data from './data.js'
import { Question } from './question.js'
import { Quiz } from './quiz.js'

const body = document.querySelector('body')

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
const quizDiv = document.querySelector('.quiz')
const centralDiv = document.querySelector('.central')
const topic = document.querySelector('.topics')
const title = document.querySelector('.title')
quizDiv.style.display = 'none'
body.style.backgroundImage = "url('images/background.svg')"

const selectedTopics = new Set()

const dialog = document.getElementById('favDialog')

const startButton = document.createElement('button')
startButton.textContent = 'Start Quiz'
startButton.classList.add('start-button')

gsap.to(startButton, {
	scale: 1.1,
	yoyo: true,
	repeat: -1,
})

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
	input.classList.add('topic-checkbox')

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
		quiz.filterAndShuffle(...selectedTopics)

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
				if (option === question.correct_answer) {
					div.classList.add('correct-answer')
				}

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
						if (op.value === question.correct_answer) {
							op.parentNode.style.backgroundColor = '#7CFC00'

							// GSAP
							gsap.to(op.parentNode, {
								// scale: 1.04,
								scaleY: 1.1,
								scaleX: 1.03,
							})
						}
					})
					answered++
					const correct = document.querySelectorAll('.correct')
					// if (answered === 5) {
					if (answered === 25) {
						// coment for testing
						const p = dialog.querySelector('.presult')
						const h1 = dialog.querySelector('.hresult')
						// if (correct.length < 2) {
						if (correct.length < 15) {
							// coment for testing
							p.style.color = 'tomato'
							h1.textContent = `❌Sorry you failed❌`
						} else {
							h1.textContent = `🎉Congratulations🎉`
						}
						p.textContent = `you have ${correct.length} correct answers of 25`
						dialog.showModal()
					}
				})
			})
			li.appendChild(optionsList)
			ul.appendChild(li)
		})

		quizDiv.style.display = 'block'
		centralDiv.style.display = 'none'
		// body.style.backgroundColor = 'rgb(14,81,180)'
		body.style.backgroundImage = "url('images/background.svg')"
	} else {
		alert('Select at least one topic')
	}
})
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => {
	answered = 0
	quizDiv.style.display = 'none'
	centralDiv.style.display = 'block'
	ul.innerHTML = ''
	// body.style.backgroundImage = null

	// body.style.backgroundColor = '#fff'

	const topics = document.querySelectorAll('.topic-checkbox')
	topics.forEach((t) => (t.checked = false))

	dialog.close()
})
