import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { useFeedbackItemsStore } from '../stores/FeedbackItemsStore'

import FeedbackItem from './FeedbackItem'

export default function FeedbackList() {
	const isLoading = useFeedbackItemsStore(state => state.isLoading)
	const errorMessages = useFeedbackItemsStore(state => state.errorMessages)
	const folteredFeedbackItems = useFeedbackItemsStore(
		state => state.getFilteredFeedbackItems()
	)
	

	return (
		<ol className='feedback-list'>
			{isLoading && <Spinner />}
			{errorMessages && <ErrorMessage message={errorMessages} />}

			{folteredFeedbackItems.map(item => (
				<FeedbackItem key={item.id} feedbackItem={item} />
			))}
		</ol>
	)
}
