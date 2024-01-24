import { useEffect } from 'react'
import HashtagList from './hashtag/HashtagList'
import Container from './layout/Container'
import Footer from './layout/Footer'
import { useFeedbackItemsStore } from './stores/FeedbackItemsStore'

function App() {
	const fetchFeedbackItems = useFeedbackItemsStore(
		state => state.fetchFeedbackItems
	)

	useEffect(() => {
		fetchFeedbackItems()
	}, [fetchFeedbackItems])

	return (
		<div className='app'>
			<Footer />

			<Container />

			<HashtagList />
		</div>
	)
}

export default App
