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
            }
        });

        // Register Java/Spring IntelliSense
        // Note: In a real app, ensure this runs only once globally.
        // For this demo, we permit "overwriting" or re-registering implicitly if possible,
        // but monaco.languages.registerCompletionItemProvider returns a disposable.

        if (language === 'java') {
            monaco.languages.registerCompletionItemProvider('java', {
                provideCompletionItems: (model: any, position: any) => {
                    const suggestions = [
                        // Spring Annotations
                        { label: '@Service', kind: monaco.languages.CompletionItemKind.Class, insertText: '@Service', detail: 'Spring Service Component' },
                        { label: '@RestController', kind: monaco.languages.CompletionItemKind.Class, insertText: '@RestController', detail: 'Spring Web Controller' },
                        { label: '@Autowired', kind: monaco.languages.CompletionItemKind.Property, insertText: '@Autowired', detail: 'Dependency Injection' },
                        { label: '@Component', kind: monaco.languages.CompletionItemKind.Class, insertText: '@Component', detail: 'Generic Spring Component' },
                        { label: '@Bean', kind: monaco.languages.CompletionItemKind.Method, insertText: '@Bean', detail: 'Configuration Bean' },
                        { label: '@Configuration', kind: monaco.languages.CompletionItemKind.Class, insertText: '@Configuration', detail: 'Spring Config Class' },
                        { label: '@Entity', kind: monaco.languages.CompletionItemKind.Class, insertText: '@Entity', detail: 'JPA Entity' },
                        { label: '@Id', kind: monaco.languages.CompletionItemKind.Property, insertText: '@Id', detail: 'JPA Primary Key' },
                        { label: '@GeneratedValue', kind: monaco.languages.CompletionItemKind.Property, insertText: '@GeneratedValue', detail: 'JPA Auto ID' },
                        { label: '@SpringBootTest', kind: monaco.languages.CompletionItemKind.Class, insertText: '@SpringBootTest', detail: 'Integration Test' },
                        { label: '@Test', kind: monaco.languages.CompletionItemKind.Method, insertText: '@Test', detail: 'JUnit Test Method' },

                        // Java/Spring Snippets
                        {
                            label: 'sysout',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'System.out.println(${1:message});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Print to console'
                        },
                        {
                            label: 'psvm',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'public static void main(String[] args) {\n\t${1}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Main method'
                        },

                        // Keywords
                        { label: 'public', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'public ' },
                        { label: 'private', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'private ' },
                        { label: 'protected', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'protected ' },
                        { label: 'class', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'class ' },
                        { label: 'interface', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'interface ' },
                        { label: 'extends', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'extends ' },
                        { label: 'implements', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'implements ' },
                        { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return ' },
                        { label: 'new', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'new ' },
                    ];
                    return { suggestions: suggestions };
                }
            });
        }
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
