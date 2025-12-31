"use client"

import * as React from "react"
import Editor, { useMonaco } from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
    initialValue?: string
    onChange?: (value: string | undefined) => void
    language?: string
}

export function CodeEditor({
    initialValue = "// Écrivez votre code ici...",
    onChange,
    language = "typescript",
    onValidate
}: CodeEditorProps & { onValidate?: (markers: any[], code: string) => void }) {
    const { theme } = useTheme()
    const editorRef = React.useRef<any>(null)
    const [markers, setMarkers] = React.useState<any[]>([])

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;

        // Listen for marker changes (errors/warnings)
        monaco.editor.onDidChangeMarkers(() => {
            const model = editor.getModel();
            if (model) {
                const currentMarkers = monaco.editor.getModelMarkers({ resource: model.uri });
                setMarkers(currentMarkers);
                // Optional: Auto-report? Or just wait for button click.
            }
        });
    }

    const handleCheck = () => {
        if (onValidate && editorRef.current) {
            const code = editorRef.current.getValue()
            onValidate(markers, code);
        }
    };

    return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-md border bg-background">
            <div className="flex-1 overflow-hidden relative">
                <Editor
                    height="100%"
                    defaultLanguage={language}
                    defaultValue={initialValue}
                    theme={theme === "dark" ? "vs-dark" : "light"}
                    onChange={onChange}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                    }}
                />
            </div>
            <div className="p-2 border-t flex justify-end bg-muted/20">
                <button
                    onClick={handleCheck}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Vérifier le code
                </button>
            </div>
        </div>
    )
}
