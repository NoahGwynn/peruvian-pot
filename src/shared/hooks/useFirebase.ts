import { useState, useEffect, useCallback } from 'react'
import { useFirebaseContext } from '@/contexts/FirebaseContext.tsx'
import type { Comment, RatingAggregation } from '@/shared/types/firebase.ts'

export function useRecipeRatings(recipeId: string) {
  const { submitRating, getRatings } = useFirebaseContext()
  const [ratings, setRatings] = useState<RatingAggregation>({ average: 0, count: 0 })
  const [loading, setLoading] = useState(true)

  const fetchRatings = useCallback(async () => {
    try {
      const data = await getRatings(recipeId)
      setRatings(data)
    } catch {
      // Firebase may not be configured
    } finally {
      setLoading(false)
    }
  }, [recipeId, getRatings])

  useEffect(() => {
    fetchRatings()
  }, [fetchRatings])

  const addRating = useCallback(
    async (value: number) => {
      try {
        await submitRating(recipeId, value)
        await fetchRatings()
      } catch {
        // Firebase may not be configured
      }
    },
    [recipeId, submitRating, fetchRatings],
  )

  return { ratings, loading, addRating }
}

export function useRecipeComments(recipeId: string) {
  const { submitComment, getComments } = useFirebaseContext()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComments = useCallback(async () => {
    try {
      const data = await getComments(recipeId)
      setComments(data)
    } catch {
      // Firebase may not be configured
    } finally {
      setLoading(false)
    }
  }, [recipeId, getComments])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const addComment = useCallback(
    async (authorName: string, text: string) => {
      try {
        await submitComment(recipeId, authorName, text)
        await fetchComments()
      } catch {
        // Firebase may not be configured
      }
    },
    [recipeId, submitComment, fetchComments],
  )

  return { comments, loading, addComment }
}
