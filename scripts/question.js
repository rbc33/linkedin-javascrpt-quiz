export class Question {
	constructor(topic, num, head, body, options, correct_answer) {
		this.topic = topic
		this.num = num
		this.head = head
		this.body = body
		this.options = options
		this.correct_answer = correct_answer
	}
	shuffleChoices() {
		let len = this.choices.length

		for (let i = 0; i < len; i++) {
			let randomIndex = Math.floor(Math.random() * len)

			;[this.choices[i], this.choices[randomIndex]] = [
				this.choices[randomIndex],
				this.choices[i],
			]
		}
	}
}
