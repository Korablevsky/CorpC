import Logo from '../Logo'
import PageHeading from '../PageHeading'
import Pattern from '../Pattern'

import FeedbackForm from '../feedback/FeedbackForm'
import { useFeedbackItemsStore } from '../stores/FeedbackItemsStore'

export default function Header() {
	const addItemToList = useFeedbackItemsStore(state => state.addItemToList)
	return (
		<header>
			<Pattern />
			<Logo />
			<PageHeading />
			<FeedbackForm onAddFeedback={addItemToList} />
		</header>
	)
}
