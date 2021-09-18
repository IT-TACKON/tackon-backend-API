export default interface Comment {
    id: string
    user_id: string
    question_id: string
    text: string
    is_solving_question: boolean
    created_at: string
    author?: string
}