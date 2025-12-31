"use client"

import { useState, useEffect } from "react"

export function useProgress() {
    const [completedChapters, setCompletedChapters] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("ts-mastery-progress")
        if (saved) {
            setCompletedChapters(JSON.parse(saved))
        }
    }, [])

    const markAsCompleted = (chapterId: string) => {
        setCompletedChapters((prev) => {
            if (prev.includes(chapterId)) return prev
            const newProgress = [...prev, chapterId]
            localStorage.setItem("ts-mastery-progress", JSON.stringify(newProgress))
            return newProgress
        })
    }

    const isCompleted = (chapterId: string) => completedChapters.includes(chapterId)

    return { completedChapters, markAsCompleted, isCompleted }
}
