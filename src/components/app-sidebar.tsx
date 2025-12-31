"use client"

import * as React from "react"
import { BookOpen, Code, Layers, Zap, Check } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/hooks/use-progress"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const data = {
    modules: [
        {
            title: "Fondamentaux",
            items: [
                { title: "Chapitre 1 : Introduction & Env", url: "/learn/intro", icon: BookOpen, id: "intro" },
                { title: "Chapitre 2 : Les types", url: "/learn/types", icon: Code, id: "types" },
                { title: "Chapitre 3 : Fonctions", url: "/learn/functions", icon: Zap, id: "functions" },
                { title: "Chapitre 4 : Classes", url: "/learn/classes", icon: Layers, id: "classes" },
            ],
        },
        {
            title: "Intermédiaire",
            items: [
                { title: "Chapitre 5 : Interfaces", url: "/learn/interfaces", icon: BookOpen, id: "interfaces" },
                { title: "Chapitre 6 : Unions & Alias", url: "/learn/unions", icon: Code, id: "unions" },
                { title: "Chapitre 7 : Génériques", url: "/learn/generics", icon: Zap, id: "generics" },
            ],
        },
        {
            title: "Avancé",
            items: [
                { title: "Chapitre 8 : Namespace & d.ts", url: "/learn/namespaces", icon: Layers, id: "namespaces" },
                { title: "Chapitre 9 : Types Avancés", url: "/learn/advanced-types", icon: Code, id: "advanced-types" },
                { title: "Chapitre 10 : Décorateurs", url: "/learn/decorators", icon: Zap, id: "decorators" },
                { title: "Chapitre 11 : Migration JS vers TS", url: "/learn/migration", icon: BookOpen, id: "migration" },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isCompleted } = useProgress()

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
                {data.modules.map((module) => (
                    <SidebarGroup key={module.title}>
                        <SidebarGroupLabel>{module.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {module.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className="flex justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </div>
                                                {isCompleted(item.id) && <Check className="h-4 w-4 text-green-500" />}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
