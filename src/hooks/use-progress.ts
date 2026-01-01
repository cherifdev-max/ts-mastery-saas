"use client"

import { useState, useEffect } from "react"

export function useProgress() {
    const [completedChapters, setCompletedChapters] = useState<string[]>([])
    const [savedCode, setSavedCode] = useState<Record<string, string>>({})

    useEffect(() => {
        const savedProgress = localStorage.getItem("ts-mastery-progress")
        if (savedProgress) {
            setCompletedChapters(JSON.parse(savedProgress))
        }
        const savedAnswers = localStorage.getItem("ts-mastery-answers")
        if (savedAnswers) {
            setSavedCode(JSON.parse(savedAnswers))
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

    const saveCode = (chapterId: string, code: string) => {
        setSavedCode((prev) => {
            const newCode = { ...prev, [chapterId]: code }
            localStorage.setItem("ts-mastery-answers", JSON.stringify(newCode))
            return newCode
        })
    }

    const getSavedCode = (chapterId: string) => savedCode[chapterId]
    const isCompleted = (chapterId: string) => completedChapters.includes(chapterId)

    return { completedChapters, markAsCompleted, isCompleted, saveCode, getSavedCode }
}
