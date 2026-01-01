"use client"

import * as React from "react"
import { BookOpen, Code, Layers, Zap, Check } from "lucide-react"
import { modules } from "@/lib/content"
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
import { useProgress } from "@/hooks/use-progress"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isCompleted, completedChapters } = useProgress()

    // Calculate progress
    const progress = modules.length > 0 ? Math.round((completedChapters.length / modules.length) * 100) : 0

    // Helper: Map content IDs to icons
    const getIcon = (id: string) => {
        if (["intro", "interfaces", "migration"].some(k => id.includes(k))) return BookOpen
        if (["types", "unions", "advanced-types"].some(k => id.includes(k))) return Code
        if (["classes", "namespaces"].some(k => id.includes(k))) return Layers
        return Zap
    }

    // Helper: Group modules logically
    const groups = [
        { title: "Fondamentaux", items: modules.slice(0, 4) },
        { title: "Intermédiaire", items: modules.slice(4, 7) },
        { title: "Avancé", items: modules.slice(7) },
    ]

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Code className="size-4" />
                    </div>
                    <div className="font-semibold text-lg">TS Mastery</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {groups.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = getIcon(item.id)
                                    return (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton asChild isActive={false}>
                                                <Link href={`/learn/${item.id}`} className="flex justify-between w-full">
                                                    <div className="flex items-center gap-2">
                                                        <Icon />
                                                        <span>{item.title}</span>
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
                ))}
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
