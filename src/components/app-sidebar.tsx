"use client"

import * as React from "react"
import { BookOpen, Code, Layers, Zap, Check, ChevronLeft } from "lucide-react"
import { courses, getCourseByModuleId } from "@/lib/content"
import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { isCompleted, completedChapters } = useProgress()

    // 1. Identify current context (Dashboard or specific Course)
    // Path format: /learn/[chapterId]
    const chapterId = pathname?.split("/learn/")[1]
    const currentCourse = chapterId ? getCourseByModuleId(chapterId) : null

    // If we are on dashboard or unknown route, maybe show a generic menu or nothing specific?
    // Let's show nothing if no course is selected, or maybe a link back to dashboard.
    if (!currentCourse) {
        return (
            <Sidebar {...props}>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Code className="size-4" />
                        </div>
                        <div className="font-semibold text-lg">Rise Up Academy</div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/"}>
                                    <Link href="/">
                                        <BookOpen />
                                        <span>Catalogue des Cours</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        )
    }

    // Calculate progress for THIS course
    const courseModuleIds = currentCourse.modules.map(m => m.id)
    const completedInCourse = courseModuleIds.filter(id => completedChapters.includes(id)).length
    const progress = Math.round((completedInCourse / currentCourse.modules.length) * 100)

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <ChevronLeft className="w-3 h-3 mr-1" />
                            Retour
                        </div>
                        <div className="font-bold text-base truncate">{currentCourse.title}</div>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {currentCourse.modules.map((item) => {
                                // Simple icon logic (or we could store icon in module)
                                const Icon = item.id.includes("intro") ? BookOpen : Code
                                const isActive = pathname === `/learn/${item.id}`

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={`/learn/${item.id}`} className="flex justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="h-4 w-4 opacity-70" />
                                                    <span className="truncate">{item.title}</span>
                                                </div>
                                                {isCompleted(item.id) && <Check className="h-4 w-4 text-green-500" />}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Progression</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
