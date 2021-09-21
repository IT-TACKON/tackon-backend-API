import { body, ValidationChain } from 'express-validator'


// User Rules
const emailRules: ValidationChain = body('email').isEmail().withMessage('Email is not valid')
const usernameRules: ValidationChain = body('username').isLength({ 'max': 45, 'min': 3 }).withMessage('Username length must between 3-45 character')
const passwordRules: ValidationChain = body('password').isLength({ 'min': 8 }).withMessage('Password must be at least 8 character')

// Question Rules
const titleRules: ValidationChain = body('title').isLength({ 'min': 10, 'max': 100 }).withMessage('Question title length must between 10-100 character')
const textRules: ValidationChain = body('text').isLength({ 'min': 50 }).withMessage('Question text must be descriptive and at least has 50 characters')


export const registerRules: ValidationChain[] = [emailRules, usernameRules, passwordRules]
export const loginRules: ValidationChain[] = [emailRules, passwordRules]
export const questionRules: ValidationChain[] = [titleRules, textRules]