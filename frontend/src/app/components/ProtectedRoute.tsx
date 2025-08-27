'use client'

import React, { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // If admin role is required but user is not admin
      if (requireAdmin && !isAdmin) {
        router.push('/dashboard') // Redirect to user dashboard
        return
      }
    }
  }, [isAuthenticated, isAdmin, loading, requireAuth, requireAdmin, redirectTo, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // If admin role is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
