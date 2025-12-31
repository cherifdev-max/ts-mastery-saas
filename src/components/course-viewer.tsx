"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"

interface CourseViewerProps {
    content: string
}

export function CourseViewer({ content }: CourseViewerProps) {
    return (
        <ScrollArea className="h-full w-full p-6 text-foreground">
            <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:leading-7 prose-pre:bg-muted prose-pre:text-muted-foreground prose-li:marker:text-primary">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </ScrollArea>
    )
}
