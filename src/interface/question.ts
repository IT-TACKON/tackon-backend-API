export interface Question {
    id: string
    user_id: string
    title: string
    text: string
    upvote: number
    created_at: string
}

export interface QuestionWithAuthor {
    id: string
    user_id: string
    author: string
    title: string
    text: string
    upvote: number
    created_at: string
}