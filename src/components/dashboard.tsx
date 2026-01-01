"use client"

import * as React from "react"
import { useProgress } from "@/hooks/use-progress"
import { courses } from "@/lib/content"
import Link from "next/link"
import { Trophy, ArrowRight, Play } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function Dashboard() {
    const { completedChapters } = useProgress()

    // Overall Progress across ALL courses for the Hero stats
    const totalModules = courses.reduce((acc, c) => acc + c.modules.length, 0)
    const completedCount = completedChapters.length
    const globalProgress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-primary/10 via-background to-background p-8 rounded-3xl border border-primary/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />

                <div className="space-y-4 relative z-10 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                        <Trophy className="w-3 h-3 mr-2" />
                        Rise Up Academy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Formez-vous aux <span className="text-primary">technologies modernes</span>.
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        TypeScript, Java, Spring Boot, et Angular. Une plateforme unique pour maîtriser la stack complète.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center bg-card p-6 rounded-2xl border shadow-sm w-full md:w-auto min-w-[200px]">
                    <div className="text-5xl font-black text-primary mb-2">{globalProgress}%</div>
                    <Progress value={globalProgress} className="h-2 w-full mb-2" />
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Maîtrise Globale</span>
                </div>
            </div>

            {/* Course Catalog Grid */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <div className="h-8 w-1 bg-primary rounded-full"></div>
                    Catalogue de Formation
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((course) => {
                        // Calculate course specific progress
                        const courseModuleIds = course.modules.map(m => m.id)
                        const courseCompletedCount = courseModuleIds.filter(id => completedChapters.includes(id)).length
                        const courseTotal = courseModuleIds.length
                        const courseProgress = courseTotal > 0 ? Math.round((courseCompletedCount / courseTotal) * 100) : 0

                        const firstModuleUrl = `/learn/${course.modules[0].id}`

                        return (
                            <Link
                                key={course.id}
                                href={firstModuleUrl}
                                className="group relative flex flex-col bg-card rounded-2xl border hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Course Banner with Image */}
                                <div className="h-48 w-full relative overflow-hidden">
                                    {/* Background Image with Overlay */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${course.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-lg">
                                            <course.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-xl text-white shadow-sm">{course.title}</h3>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{course.description}</p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                                            <span>{courseCompletedCount} / {courseTotal} Chapitres</span>
                                            <span>{courseProgress}%</span>
                                        </div>
                                        <Progress value={courseProgress} className="h-1.5" />

                                        <div className="pt-2 flex items-center text-sm font-semibold text-primary">
                                            {courseProgress === 100 ? "Réviser" : courseProgress > 0 ? "Continuer" : "Commencer"}
                                            {courseProgress > 0 ? <Play className="ml-2 w-4 h-4 fill-current" /> : <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
