import { body, ValidationChain } from 'express-validator'

function makePasswordRules(bodyName: string): ValidationChain {
    return body(bodyName).isLength({ 'min': 8 }).withMessage('Password must be at least 8 character')
}

// User Rules
const emailRules: ValidationChain = body('email').isEmail().withMessage('Email is not valid')
const usernameRules: ValidationChain = body('username').isLength({ 'max': 45, 'min': 3 }).withMessage('Username length must between 3-45 character')
const passwordRules: ValidationChain = makePasswordRules('password')
const newPasswordRules: ValidationChain = makePasswordRules('newPassword')
const currentPasswordRules: ValidationChain = makePasswordRules('currentPassword')

// Question Rules
const titleRules: ValidationChain = body('title').isLength({ 'min': 10, 'max': 100 }).withMessage('Question title length must between 10-100 character')
const textRules: ValidationChain = body('text').isLength({ 'min': 50 }).withMessage('Text must be descriptive and at least has 50 characters')

export const registerRules: ValidationChain[] = [emailRules, usernameRules, passwordRules]
export const loginRules: ValidationChain[] = [emailRules, passwordRules]
export const updateUserRules: ValidationChain[] = [emailRules, usernameRules, currentPasswordRules, newPasswordRules]
export const deleteUserRules: ValidationChain[] = [passwordRules]
export const questionRules: ValidationChain[] = [titleRules, textRules]
export const commentRules: ValidationChain[] = [textRules]