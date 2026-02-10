import { createContext, useContext, useCallback } from 'react'
import type { ReactNode } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase.ts'
import type { Comment, RatingAggregation } from '@/shared/types/firebase.ts'

interface FirebaseContextValue {
  submitRating: (recipeId: string, value: number) => Promise<void>
  getRatings: (recipeId: string) => Promise<RatingAggregation>
  submitComment: (recipeId: string, authorName: string, text: string) => Promise<void>
  getComments: (recipeId: string) => Promise<Comment[]>
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const submitRating = useCallback(async (recipeId: string, value: number) => {
    await addDoc(collection(db, 'ratings'), {
      recipeId,
      value,
      createdAt: Timestamp.now(),
    })
  }, [])

  const getRatings = useCallback(async (recipeId: string): Promise<RatingAggregation> => {
    const q = query(collection(db, 'ratings'), where('recipeId', '==', recipeId))
    const snapshot = await getDocs(q)
    const ratings = snapshot.docs.map((doc) => doc.data().value as number)
    if (ratings.length === 0) return { average: 0, count: 0 }
    const sum = ratings.reduce((a, b) => a + b, 0)
    return { average: sum / ratings.length, count: ratings.length }
  }, [])

  const submitComment = useCallback(
    async (recipeId: string, authorName: string, text: string) => {
      await addDoc(collection(db, 'comments'), {
        recipeId,
        authorName,
        text,
        createdAt: Timestamp.now(),
      })
    },
    [],
  )

  const getComments = useCallback(async (recipeId: string): Promise<Comment[]> => {
    const q = query(
      collection(db, 'comments'),
      where('recipeId', '==', recipeId),
      orderBy('createdAt', 'desc'),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      recipeId: doc.data().recipeId,
      authorName: doc.data().authorName,
      text: doc.data().text,
      createdAt: doc.data().createdAt.toDate(),
    }))
  }, [])

  return (
    <FirebaseContext.Provider value={{ submitRating, getRatings, submitComment, getComments }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebaseContext() {
  const ctx = useContext(FirebaseContext)
  if (!ctx) throw new Error('useFirebaseContext must be used within FirebaseProvider')
  return ctx
}
