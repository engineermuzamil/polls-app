import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8),
  })
)

loginValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'This field is required',
    'string.email': 'Please enter a valid email address',
    'string.minLength': 'Must be at least {{ min }} characters',
  },
  {
    'email.required': 'Please enter your email address',
    'email.email': 'Please enter a valid email address',
    'password.required': 'Please enter your password',
    'password.minLength': 'Password must be at least 8 characters',
  }
)
