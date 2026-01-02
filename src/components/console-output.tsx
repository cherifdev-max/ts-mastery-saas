"use client"

import * as React from "react"
import { Terminal, XCircle, CheckCircle, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ConsoleOutputProps {
    logs: string[]
    isOpen: boolean
    onClose: () => void
    status: "idle" | "running" | "success" | "error"
}

export function ConsoleOutput({ logs, isOpen, onClose, status }: ConsoleOutputProps) {
    if (!isOpen) return null

    return (
        <div className="h-48 border-t bg-black text-white font-mono text-sm flex flex-col transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    {status === "running" && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
                    {status === "success" && <div className="flex items-center gap-1 text-green-500 text-xs"><CheckCircle className="w-3 h-3" /> SUCCÈS</div>}
                    {status === "error" && <div className="flex items-center gap-1 text-red-500 text-xs"><XCircle className="w-3 h-3" /> ÉCHEC</div>}
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className={cn(
                            "break-words",
                            log.startsWith(">") ? "text-yellow-400 font-bold" : "text-zinc-300",
                            log.includes("Error") ? "text-red-400" : "",
                            log.includes("Success") ? "text-green-400" : ""
                        )}>
                            {log}
                        </div>
                    ))}
                    {logs.length === 0 && <span className="text-zinc-600 italic">En attente de compilation...</span>}
                </div>
            </ScrollArea>
        </div>
    )
}
