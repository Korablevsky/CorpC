import { createContext, useMemo, useState } from 'react'
import { useFeedbackItems } from '../../lib/hooks'
import { TFeedbackItem } from '../../lib/types'

type FeedbackItemsContextProviderProps = {
	children: React.ReactNode
}

type TFeedbackItemsContext = {
	isLoading: boolean
	errorMessages: string
	companyList: string[]
	folteredFeedbackItems: TFeedbackItem[]
	handleAddFeedback: (text: string) => void
	handleSelectCompany: (company: string) => void
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
	null
)

export default function FeedbackItemsContextProvider({
	children,
}: FeedbackItemsContextProviderProps) {
	const { feedbackItems, setFeedbackItems, isLoading, errorMessages } =
		useFeedbackItems()
	const [selectedCompany, setSelectedCompany] = useState('')

	const handleAddFeedback = async (text: string) => {
		const companyName = text
			.split(' ')
			.find(word => word.includes('#'))!
			.substring(1)

		const newItem: TFeedbackItem = {
			id: new Date().getTime(),
			text: text,
			upvoteCount: 0,
			daysAgo: 0,
			company: companyName,
			badgeLetter: companyName.substring(0, 1).toUpperCase(),
		}

		setFeedbackItems([...feedbackItems, newItem])

		await fetch(
			'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
			{
				method: 'POST',
				body: JSON.stringify(newItem),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)
	}
	const companyList: string[] = useMemo(() => {
		return feedbackItems
			.map(item => item.company)
			.filter((company, index, array) => {
				return array.indexOf(company) === index
			})
	}, [feedbackItems])
	const folteredFeedbackItems = useMemo(() => {
		return selectedCompany
			? feedbackItems.filter(
					feedbackItem => feedbackItem.company === selectedCompany )
			: feedbackItems
	}, [feedbackItems, selectedCompany])
	const handleSelectCompany = (company: string) => {
		setSelectedCompany(company)
	}

	return (
		<FeedbackItemsContext.Provider
			value={{
				isLoading,
				errorMessages,
				companyList,
				folteredFeedbackItems,
				handleAddFeedback,
				handleSelectCompany,
			}}
		>
			{children}
		</FeedbackItemsContext.Provider>
	)
}
