"use client"

import { useState, useEffect, useCallback } from "react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type Toast = ToastProps & {
  id: string
}

type ToastContextType = {
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
  toasts: Toast[]
}

const useToastContext = (): ToastContextType => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ duration = 5000, ...props }: ToastProps) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prevToasts) => [...prevToasts, { id, ...props }])

    if (duration) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
}

export const useToast = () => {
  const [mounted, setMounted] = useState(false)
  const context = useToastContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return {
      toast: () => null,
      dismiss: () => null,
      toasts: [],
    }
  }

  return context
}