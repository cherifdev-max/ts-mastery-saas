"use client"

import * as React from "react"
import { PanelGroup, Panel, PanelResizeHandle } from "@/components/ui/resizable"

interface WorkspaceLayoutProps {
    leftPanel: React.ReactNode
    rightPanel: React.ReactNode
}

export function WorkspaceLayout({ leftPanel, rightPanel }: WorkspaceLayoutProps) {
    return (
        <PanelGroup direction="horizontal" className="h-full w-full">
            <Panel defaultSize={50} minSize={30}>
                <div className="h-full w-full overflow-auto p-4">
                    {leftPanel}
                </div>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50} minSize={30}>
                <div className="h-full w-full overflow-hidden">
                    {rightPanel}
                </div>
            </Panel>
        </PanelGroup>
    )
}
