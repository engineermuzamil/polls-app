import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'

const email = () => vine.string().trim().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const signupValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: email().unique({ table: 'users', column: 'email' }),
    password: password(),
    role: vine.enum(['admin', 'voter'] as const),
  })
)

signupValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'This field is required',
    'string.minLength': 'Must be at least {{ min }} characters',
    'string.maxLength': 'Must be under {{ max }} characters',
    'string.email': 'Please enter a valid email address',
    'enum': 'Invalid selection',
  },
  {
    'fullName.required': 'Please enter your full name',
    'fullName.minLength': 'Name must be at least 2 characters',
    'email.required': 'Please enter your email address',
    'email.email': 'Please enter a valid email address',
    'email.unique': 'An account with this email already exists',
    'password.required': 'Please enter a password',
    'password.minLength': 'Password must be at least 8 characters',
    'role.enum': 'Please select a valid role',
  }
)
