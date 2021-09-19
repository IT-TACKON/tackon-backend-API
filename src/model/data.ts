export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Question {
    id: string
    user_id: string
    title: string
    text: string
    upvote: number
    created_at: string
    author?: string
    solving_comment_id?: string
}

export interface Comment {
    id: string
    user_id: string
    question_id: string
    text: string
    created_at: string
    author?: string
}