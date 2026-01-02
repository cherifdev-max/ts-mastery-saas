"use client"

import * as React from "react"
import { WorkspaceLayout } from "@/components/workspace-layout"
import { CourseViewer } from "@/components/course-viewer"
import { WorkspaceLayout } from "@/components/workspace-layout"
import { CourseViewer } from "@/components/course-viewer"
import dynamic from "next/dynamic"
import { ConsoleOutput } from "@/components/console-output"
import { useProgress } from "@/hooks/use-progress"
import { getCourseByModuleId } from "@/lib/content"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const CodeEditor = dynamic(
    () => import("@/components/code-editor").then((mod) => mod.CodeEditor),
    { ssr: false }
)

interface LearnCanvasProps {
    content: string
    initialCode: string
    chapterId: string
    validation: { type: string, value: string, message: string }
    nextChapterId?: string
}

export function LearnCanvas({ content, initialCode, chapterId, validation, nextChapterId }: LearnCanvasProps) {
    const { markAsCompleted, isCompleted, saveCode, getSavedCode } = useProgress()
    const router = useRouter()

    // Course Context
    const course = getCourseByModuleId(chapterId)
    const language = (course?.id === "java" || course?.id === "springboot") ? "java" : "typescript"

    const [isSuccess, setIsSuccess] = React.useState(isCompleted(chapterId))
    const [currentCode, setCurrentCode] = React.useState(initialCode)

    // Console State
    const [isConsoleOpen, setIsConsoleOpen] = React.useState(false)
    const [consoleLogs, setConsoleLogs] = React.useState<string[]>([])
    const [consoleStatus, setConsoleStatus] = React.useState<"idle" | "running" | "success" | "error">("idle")

    // Effect to load saved code on mount or chapter change
    React.useEffect(() => {
        const saved = getSavedCode(chapterId)
        if (saved) {
            setCurrentCode(saved)
        } else {
            setCurrentCode(initialCode)
            // Reset console on chapter change
            setConsoleLogs([])
            setConsoleStatus("idle")
            setIsConsoleOpen(false)
        }
        setIsSuccess(isCompleted(chapterId))
    }, [chapterId, getSavedCode, initialCode, isCompleted])

    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
            saveCode(chapterId, newCode)
        }
    }

    const triggerSuccess = () => {
        setIsSuccess(true)
        markAsCompleted(chapterId)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }

    const handleValidation = (markers: any[], code: string) => {
        setIsConsoleOpen(true)
        setConsoleStatus("running")
        setConsoleLogs(["> cd /src/app", `> ${language === "java" ? "javac Main.java" : "tsc main.ts"}`, "Compiling..."])

        // Simulate compilation delay
        setTimeout(() => {
            // 1. Check syntax errors from Monaco
            if (markers.length > 0) {
                setConsoleStatus("error")
                setConsoleLogs(prev => [
                    ...prev,
                    "Compilation failed.",
                    ...markers.map((m: any) => `Line ${m.startLineNumber}: ${m.message}`)
                ])
                return
            }

            // 2. Check semantic rules
            let isValid = false
            if (!validation) {
                isValid = true;
            } else if (validation.type === 'regex') {
                const regex = new RegExp(validation.value)
                isValid = regex.test(code)
            } else if (validation.type === 'includes') {
                isValid = code.includes(validation.value)
            }

            if (isValid) {
                setConsoleStatus("success")
                setConsoleLogs(prev => [
                    ...prev,
                    "Build Success! (1.2s)",
                    "Running...",
                    "--------------------------------",
                    "Hello World",
                    "Process finished with exit code 0"
                ])
                triggerSuccess()
            } else {
                setConsoleStatus("error")
                // Fake intelligent error message
                const errorMsg = language === "java"
                    ? `Error: Logic verification failed. Expected: '${validation.message}'`
                    : `Error: Validation failed. ${validation.message}`

                setConsoleLogs(prev => [...prev, "Build Failed.", errorMsg])
            }
        }, 1500)
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
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-hidden">
                            <CodeEditor
                                key={chapterId}
                                initialValue={currentCode}
                                language={language}
                                onChange={handleCodeChange}
                                onValidate={handleValidation}
                            />
                        </div>
                        <ConsoleOutput
                            isOpen={isConsoleOpen}
                            logs={consoleLogs}
                            status={consoleStatus}
                            onClose={() => setIsConsoleOpen(false)}
                        />
                    </div>
                }
            />
        </div>
    )
}
