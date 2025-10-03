export class Quiz {
	constructor(questions, timeLimit, timeRemaining) {
		this.questions = questions
		this.timeLimit = timeLimit
		this.timeRemaining = timeRemaining
		this.correctAnswers = 0
		this.currentQuestionIndex = 0
	}

	getQuestion() {
		return this.questions[this.currentQuestionIndex]
	}

	moveToNextQuestion() {
		this.currentQuestionIndex++
	}

	shuffleQuestions() {
		let len = this.questions.length

		for (let i = 0; i < len; i++) {
			let randomIndex = Math.floor(Math.random() * len)

			;[this.questions[i], this.questions[randomIndex]] = [
				this.questions[randomIndex],
				this.questions[i],
			]
		}
		this.questions = this.questions.slice(0, 24)
	}

	checkAnswer(answer) {
		if (answer === this.questions[this.currentQuestionIndex].answer) {
			this.correctAnswers++
		}
	}

	hasEnded() {
		return this.currentQuestionIndex < this.questions.length ? false : true
	}

	filterQuestionsByTopic(topic1, topic2, topic3) {
		this.questions = this.questions.filter(
			(q) => q.topic === topic1 || q.topic === topic2 || q.topic === topic3
		)
	}
}
