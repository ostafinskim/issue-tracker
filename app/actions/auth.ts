'use server'

import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword
} from '@/lib/auth'
import { getUserByEmail } from '@/lib/dal'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { mockDelay } from '../../lib/utils'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    // Extract data from form
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validate with Zod
    const validationResult = SignInSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Find user by email
    const user = await getUserByEmail(data.email)
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          email: ['Invalid email or password'],
        },
      }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          password: ['Invalid email or password'],
        },
      }
    }

    // Create session
    await createSession(user.id)

    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    }
  }
}

export async function signUp(formData: FormData) {
  try {

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    }

    const validationResult = SignUpSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid entries',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    // check if exitsts

    const existingUser = await getUserByEmail(data.email)

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists, please login...',
        error: 'User already exists, please login...'
      }
    }

    const user = await createUser(data.email, data.password)

    if (!user) {
      return {
        success: false,
        message: 'Failed to create user...',
        error: 'Failed to create user'
      }
    }

    await createSession(user.id)

    return {
      success: true,
      message: 'Account created successfully'
    }

  } catch (error) {
    console.error('Sign up failed', error)
    return {
      success: false,
      message: 'An error occurred while creating your account',
      error: 'Failed to create account'
    }
  }
}

export async function signOut(): Promise<void> {
  try {
    await mockDelay(300)
    await deleteSession()
  } catch (error) {
    console.log('Sing out error', error)
    throw new Error('Failed to sing out')
  } finally {
    redirect('/signin')
  }
}
