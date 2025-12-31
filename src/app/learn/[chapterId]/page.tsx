import { LearnCanvas } from "@/components/learn-canvas"
import { getModule, getNextModule } from "@/lib/content"
import { notFound } from "next/navigation"

export default async function LearnPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params
    const module = getModule(chapterId)
    const nextModule = getNextModule(chapterId)

    if (!module) {
        return notFound()
    }

    return (
        <LearnCanvas
            chapterId={chapterId}
            content={module.content}
            initialCode={`// ${module.title}\n// Écrivez votre code ici...`}
            validation={module.validation}
            nextChapterId={nextModule?.id}
        />
    )
}
