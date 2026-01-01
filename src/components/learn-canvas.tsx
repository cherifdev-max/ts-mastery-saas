"use client"

import * as React from "react"
import { WorkspaceLayout } from "@/components/workspace-layout"
import { CourseViewer } from "@/components/course-viewer"
import { CodeEditor } from "@/components/code-editor"
import { useProgress } from "@/hooks/use-progress"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

interface LearnCanvasProps {
    content: string
    initialCode: string
    chapterId: string
    validation: { type: string, value: string, message: string }
    nextChapterId?: string
}

export function LearnCanvas({ content, initialCode, chapterId, validation, nextChapterId }: LearnCanvasProps) {
    const { markAsCompleted, isCompleted } = useProgress()
    const router = useRouter()
    const [isSuccess, setIsSuccess] = React.useState(isCompleted(chapterId))

    // Reset success state when chapter changes
    React.useEffect(() => {
        setIsSuccess(isCompleted(chapterId))
    }, [chapterId])

    const triggerSuccess = () => {
        setIsSuccess(true)
        markAsCompleted(chapterId)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
        alert("Bravo ! Exercice validé. 🚀")
    }

    return (
        <div className="h-screen pt-4 relative">
            {isSuccess && (
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 z-50 animate-pulse" />
            )}
            <WorkspaceLayout
                leftPanel={
                    <div className="h-full flex flex-col">
                        <CourseViewer content={content} />
                        {isSuccess && nextChapterId && (
                            <div className="p-4 border-t bg-green-50 dark:bg-green-900/20">
                                <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">Chapitre validé ! 🎉</p>
                                <button
                                    onClick={() => router.push(`/learn/${nextChapterId}`)}
                                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                >
                                    Chapitre Suivant &rarr;
                                </button>
                            </div>
                        )}
                        {isSuccess && !nextChapterId && (
                            <div className="p-4 border-t bg-yellow-50 dark:bg-yellow-900/20">
                                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">Félicitations ! Vous avez terminé le cours. 🏆</p>
                            </div>
                        )}
                    </div>
                }
                rightPanel={
                    <CodeEditor
                        initialValue={initialCode}
                        onValidate={(markers, code) => {
                            // 1. Check syntax errors
                            if (markers.length > 0) {
                                alert(`Erreur de syntaxe : ${markers.length} erreur(s) détectée(s).`)
                                return
                            }

                            // 2. Check semantic rules
                            let isValid = false
                            if (!validation) {
                                // Default pass if no validation rules
                                isValid = true;
                            } else if (validation.type === 'regex') {
                                const regex = new RegExp(validation.value)
                                isValid = regex.test(code)
                            } else if (validation.type === 'includes') {
                                isValid = code.includes(validation.value)
                            }

                            if (isValid) {
                                triggerSuccess()
                            } else {
                                alert(`Validation échouée : ${validation.message}`)
                            }
                        }}
                    />
                }
            />
        </div>
    )
}
