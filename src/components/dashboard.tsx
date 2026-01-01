"use client"

import * as React from "react"
import { useProgress } from "@/hooks/use-progress"
import { modules } from "@/lib/content"
import Link from "next/link"
import { Check, Lock, Play, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function Dashboard() {
    const { completedChapters } = useProgress()

    // Calculate progress
    const totalChapters = modules.length
    const completedCount = completedChapters.length
    const progressPercentage = Math.round((completedCount / totalChapters) * 100)

    // Determine next chapter to specificy action button
    const firstIncomplete = modules.find(m => !completedChapters.includes(m.id))

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-primary/10 via-background to-background p-8 rounded-3xl border border-primary/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />

                <div className="space-y-4 relative z-10 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                        <Trophy className="w-3 h-3 mr-2" />
                        De Zéro à Expert
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Bon retour, <span className="text-primary">Apprenti</span>.
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Vous avez complété <strong className="text-foreground">{completedCount}</strong> sur <strong className="text-foreground">{totalChapters}</strong> chapitres.
                        Continuez votre ascension vers la maîtrise de TypeScript.
                    </p>

                    {firstIncomplete && (
                        <div className="pt-4">
                            <Link
                                href={`/learn/${firstIncomplete.id}`}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                            >
                                <Play className="w-5 h-5 mr-2 fill-current" />
                                Continuer : {firstIncomplete.title}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Circular Progress (Visual only for now, using linear accessible one below) */}
                <div className="relative z-10 flex flex-col items-center justify-center bg-card p-6 rounded-2xl border shadow-sm w-full md:w-auto min-w-[200px]">
                    <div className="text-5xl font-black text-primary mb-2">{progressPercentage}%</div>
                    <Progress value={progressPercentage} className="h-2 w-full mb-2" />
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Progression Globale</span>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Votre Parcours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => {
                        const isCompleted = completedChapters.includes(module.id)
                        const isLocked = !isCompleted && index > 0 && !completedChapters.includes(modules[index - 1].id)

                        // Special logic: First chapter is always unlocked
                        const canAccess = index === 0 || isCompleted || completedChapters.includes(modules[index - 1].id)

                        return (
                            <Link
                                key={module.id}
                                href={canAccess ? `/learn/${module.id}` : "#"}
                                className={cn(
                                    "group relative flex flex-col p-6 bg-card rounded-xl border transition-all duration-300",
                                    canAccess ? "hover:shadow-md hover:border-primary/50 cursor-pointer" : "opacity-50 cursor-not-allowed grayscale-[0.5]"
                                )}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
                                        isCompleted ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"
                                    )}>
                                        {index + 1}
                                    </div>
                                    {isCompleted ? (
                                        <div className="bg-green-500 text-white rounded-full p-1">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    ) : !canAccess ? (
                                        <Lock className="w-5 h-5 text-muted-foreground" />
                                    ) : null}
                                </div>

                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                    {module.title}
                                </h3>

                                {/* We could extract description from content but simpler to have hardcoded snippet or just title for now */}
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {module.content.substring(0, 100).replace(/#/g, '')}...
                                </p>

                                {canAccess && !isCompleted && (
                                    <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        Commencer <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
