import { useState } from 'react'
import { MAX_CHARACTERS } from '../../lib/constants'

type FeedbackFormProps = {
	onAddFeedback: (text: string) => void
}

export default function FeedbackForm({ onAddFeedback }: FeedbackFormProps) {
	const [text, setText] = useState('')
	const [showValidationIndicator, setShowValidationIndicator] = useState(false)
	const [showInvalidIndicator, setShowInvalidIndicator] = useState(false)
	const charCount = MAX_CHARACTERS - text.length

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value
		if (newText.length > MAX_CHARACTERS) return

		setText(newText)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (text.includes('#') && text.length >= 5) {
			setShowValidationIndicator(true)
			setTimeout(() => setShowValidationIndicator(false), 2000)
		} else {
			setShowInvalidIndicator(true)
			setTimeout(() => setShowInvalidIndicator(false), 2000)
			return
		}

		onAddFeedback(text)
		setText('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`form ${showValidationIndicator ? 'form--valid' : ''} ${
				showInvalidIndicator ? 'form--invalid' : ''
			}`}
		>
			<textarea
				value={text}
				onChange={handleChange}
				id='feedback-textarea'
				placeholder='hello'
				spellCheck={false}
			/>

			<label htmlFor='feedback-textarea'>
				Enter your feedback here, remember to #hashtag the company!
			</label>

			<div>
				<p className='u-italic'>{charCount}</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	)
}
