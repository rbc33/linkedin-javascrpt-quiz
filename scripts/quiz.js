export class Quiz {
	constructor(questions, timeLimit, timeRemaining) {
		this.questions = [...questions]
		this.timeLimit = timeLimit
		this.timeRemaining = timeRemaining
		this.correctAnswers = 0
		this.currentQuestionIndex = 0
	}

	filterAndShuffle(...topics) {
		// Filter by selected topics
		this.questions = this.questions.filter((question) =>
			topics.includes(question.topic)
		)

		// Shuffle using Fisher-Yates
		const len = this.questions.length
		for (let i = len - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[this.questions[i], this.questions[j]] = [
				this.questions[j],
				this.questions[i],
			]
		}

		// Limit to exactly 25 questions
		this.questions = this.questions.slice(0, 25)
		console.log(
			`Questions after filtering and shuffling: ${this.questions.length}`
		)

		return this.questions
	}

	getQuestion() {
		return this.questions[this.currentQuestionIndex]
	}
}
