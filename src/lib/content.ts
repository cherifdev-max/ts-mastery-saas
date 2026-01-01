import { BookOpen, Code, Layers, Zap, Database, Server, Smartphone } from "lucide-react"

export interface ValidationRule {
    type: "regex" | "includes"
    value: string
    message: string
}

export interface Module {
    id: string
    title: string
    content: string
    validation: ValidationRule
}

export interface Course {
    id: string
    title: string
    description: string
    image: string // For visual cards, can be a color gradient or image path
    icon: any
    modules: Module[]
}

// Reuse existing TS content
const tsModules: Module[] = [
    {
        id: "intro",
        title: "Chapitre 1 : Introduction & Env",
        content: "# De Zéro à Héros : Introduction\n\nBienvenue dans votre parcours pour devenir un expert TypeScript.\n\n### Objectif du cours\nNous allons partir de zéro (aucune connaissance requise en TS) pour arriver à maîtriser les concepts les plus avancés du langage.\n\n### L'essentiel à retenir (Débutant) 💡\n- **TypeScript** n'est pas un nouveau langage, c'est du JavaScript avec des **types** en plus.\n- Il sert à attraper les erreurs **avant** d'exécuter le code.\n- Tout code JavaScript valide est aussi du code TypeScript valide.\n\n### Exercice\nDéclarez une variable `welcome` contenant la chaîne de caractères \"Hello TypeScript\".",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+welcome\\s*(:\\s*string)?\\s*=\\s*['\"]Hello TypeScript['\"]",
            message: "Vous devez déclarer une variable 'welcome' égale à 'Hello TypeScript'."
        }
    },
    {
        id: "types",
        title: "Chapitre 2 : Les types",
        content: "# Les Fondations : Types de base\n\nPour devenir expert, il faut des bases solides. TypeScript est avant tout une question de *types*.\n\n### L'essentiel à retenir (Débutant) 💡\n- Les types de base sont : `string` (texte), `number` (nombre), `boolean` (vrai/faux).\n- Les tableaux s'écrivent `number[]` ou `string[]`.\n- Le type `any` désactive la sécurité de TypeScript. **Évitez-le** autant que possible !\n\n### Exercice\nCréez une variable `age` de type `number` valant `25`.",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+age\\s*:\\s*number\\s*=\\s*25",
            message: "Déclarez une variable 'age' explicitement typée 'number' avec la valeur 25."
        }
    },
    {
        id: "functions",
        title: "Chapitre 3 : Fonctions",
        content: "# Typage des Fonctions\n\n### L'essentiel à retenir (Débutant) 💡\n- On doit dire à TypeScript quel type d'arguments notre fonction attend.\n- On doit aussi dire ce que la fonction retourne (après les parenthèses).\n- Exemple : `function maFonction(arg: number): number { ... }`\n\n### Exercice\nÉcrivez une fonction `add` qui prend deux arguments `a` et `b` (tous deux de type `number`) et retourne un `number`.",
        validation: {
            type: "regex",
            value: "function\\s+add\\s*\\(\\s*a\\s*:\\s*number\\s*,\\s*b\\s*:\\s*number\\s*\\)\\s*:\\s*number",
            message: "Définissez la fonction 'add(a: number, b: number): number'."
        }
    },
    {
        id: "classes",
        title: "Chapitre 4 : Classes",
        content: "# Programmation Orientée Objet\n\n### L'essentiel à retenir (Débutant) 💡\n- Une **Classe** est un plan pour construire des objets.\n- `public` : Tout le monde peut toucher à cette propriété.\n- `private` : Seule la classe elle-même peut y toucher. C'est utile pour protéger vos données.\n\n### Exercice\nCréez une classe `User` avec une propriété publique `name` (string).",
        validation: {
            type: "includes",
            value: "class User",
            message: "Vous devez définir une classe nommée 'User'."
        }
    },
    {
        id: "interfaces",
        title: "Chapitre 5 : Interfaces",
        content: "# Structurer la donnée\n\n### L'essentiel à retenir (Débutant) 💡\n- Une **Interface** est un contrat. Elle force un objet à avoir une certaine forme.\n- Si votre interface dit qu'il faut un `id`, vous ne pourrez pas créer d'objet sans `id`.\n- C'est la fonctionnalité la plus utilisée pour décrire vos données (utilisateurs, produits, etc.).\n\n### Exercice\nDéfinissez une interface `Product` avec un `id` (number) et un `name` (string).",
        validation: {
            type: "includes",
            value: "interface Product",
            message: "L'interface 'Product' est manquante."
        }
    },
    {
        id: "unions",
        title: "Chapitre 6 : Unions & Alias",
        content: "# Unions & Aliases\n\n### L'essentiel à retenir (Débutant) 💡\n- L'**Union** (`|`) veut dire \"OU\". `string | number` = \"soit un texte, soit un nombre\".\n- L'**Alias** (`type`) permet de donner un nom sympa à un type compliqué.\n- Ex: `type ID = string | number;`\n\n### Exercice\nCréez un Type Alias `Status` qui peut être soit \"success\" soit \"error\".",
        validation: {
            type: "regex",
            value: "type\\s+Status\\s*=\\s*(\"success\"\\s*\\|\\s*\"error\"|\"error\"\\s*\\|\\s*\"success\")",
            message: "Définissez le type 'Status' comme l'union de 'success' et 'error'."
        }
    },
    {
        id: "generics",
        title: "Chapitre 7 : Génériques",
        content: "# Niveau Intermédiaire : Les Génériques\n\n### L'essentiel à retenir (Débutant) 💡\n- Les **Génériques** (`<T>`) permettent de créer du code qui s'adapte.\n- Imaginez une boîte qui peut contenir n'importe quoi, mais qui sait ce qu'elle contient.\n- C'est comme passer un *type* en argument d'une fonction.\n\n### Exercice\nCréez une fonction `identity<T>` qui retourne son argument.",
        validation: {
            type: "includes",
            value: "<T>",
            message: "Utilisez la syntaxe générique <T>."
        }
    },
    {
        id: "namespaces",
        title: "Chapitre 8 : Namespace & d.ts",
        content: "# Organisation et Écosystème\n\n### L'essentiel à retenir (Débutant) 💡\n- Les **Namespaces** servent à ranger votre code dans des \"casiers\" pour éviter les conflits de noms.\n- Les fichiers `.d.ts` sont des manuels d'instruction pour dire à TypeScript comment fonctionne une librairie JavaScript externe.\n\n### Exercice\nUtilisez le mot-clé `namespace` pour créer un espace `Utils`.",
        validation: {
            type: "includes",
            value: "namespace Utils",
            message: "Créez un namespace appelé 'Utils'."
        }
    },
    {
        id: "advanced-types",
        title: "Chapitre 9 : Types Avancés",
        content: "# Niveau Expert : Types Avancés\n\n### L'essentiel à retenir (Débutant) 💡\n- TypeScript permet de transformer des types existants.\n- `Partial<T>` est un outil magique qui prend un type et rend tous ses champs optionnels.\n- Il existe plein d'autres outils (\"Utility Types\") pour manipuler les types comme des Lego.\n\n### Exercice\nUtilisez `Partial<T>` pour créer un type qui rend toutes les propriétés optionnelles.",
        validation: {
            type: "includes",
            value: "Partial<",
            message: "Utilisez l'utilitaire Partial<T>."
        }
    },
    {
        id: "decorators",
        title: "Chapitre 10 : Décorateurs",
        content: "# Méta-programmation\n\n### L'essentiel à retenir (Débutant) 💡\n- Un **Décorateur** commence par `@` (ex: `@Component`).\n- C'est une fonction qui vient se \"coller\" sur une classe pour lui rajouter des fonctionnalités sans changer son code interne.\n- Très utilisé dans les frameworks comme Angular.\n\n### Exercice\nCréez une fonction `@Log` (simple fonction pour l'instant).",
        validation: {
            type: "includes",
            value: "function Log",
            message: "Définissez une fonction nommée Log."
        }
    },
    {
        id: "migration",
        title: "Chapitre 11 : Migration JS vers TS",
        content: "# Le Test Ultime : Migration\n\n### L'essentiel à retenir (Débutant) 💡\n- Pas de panique ! On ne migre pas tout d'un coup.\n- Commencez par renommer les fichiers `.js` en `.ts`.\n- Corrigez les erreurs type `any` une par une.\n- C'est un processus progressif.\n\n### Conclusion\nVous êtes arrivé au bout !\n\nÉcrivez `// EXPERT` pour valider ce parcours.",
        validation: {
            type: "includes",
            value: "// EXPERT",
            message: "Écrivez le commentaire // EXPERT pour finir."
        }
    }
]

// Define Courses
export const courses: Course[] = [
    {
        id: "typescript",
        title: "TypeScript Mastery",
        description: "De Zéro à Expert : Maîtrisez le sur-ensemble typé de JavaScript.",
        image: "/images/ts.png",
        icon: Code,
        modules: tsModules
    },
    {
        id: "java",
        title: "Java Fundamentals",
        description: "Apprenez le langage orienté objet le plus utilisé en entreprise.",
        image: "/images/java.png",
        icon: Server,
        modules: [
            {
                id: "java-intro",
                title: "Chapitre 1 : Hello Java",
                content: "# Introduction à Java\n\nJava est un langage robuste et orienté objet.\n\n### Exercice\nCréez une classe `Main` avec une méthode `main`.",
                validation: {
                    type: "includes",
                    value: "class Main",
                    message: "Définissez une classe 'Main'."
                }
            }
        ]
    },
    {
        id: "springboot",
        title: "Spring Boot Starter",
        description: "Créez des API REST puissantes rapidement avec Spring Boot.",
        image: "/images/spring.png",
        icon: Database,
        modules: [
            {
                id: "spring-intro",
                title: "Chapitre 1 : Votre première API",
                content: "# Spring Boot\n\nLe framework Java n°1 pour le web.\n\n### Exercice\nAnnotez une classe avec `@SpringBootApplication`.",
                validation: {
                    type: "includes",
                    value: "@SpringBootApplication",
                    message: "Utilisez l'annotation @SpringBootApplication."
                }
            }
        ]
    },
    {
        id: "angular",
        title: "Angular Architecture",
        description: "Le framework Google pour des applications web scalables.",
        image: "/images/angular.png",
        icon: Smartphone, // Closest simple icon for App/Frontend
        modules: [
            {
                id: "angular-intro",
                title: "Chapitre 1 : Composants",
                content: "# Angular\n\nTout est composant.\n\n### Exercice\nUtilisez le décorateur `@Component`.",
                validation: {
                    type: "includes",
                    value: "@Component",
                    message: "Utilisez le décorateur @Component."
                }
            }
        ]
    }
]

// Compatibility export for existing code using 'modules'
// Flatten all modules for simple 'find by ID' lookups
export const modules = courses.flatMap(c => c.modules)

export function getModule(id: string) {
    return modules.find(m => m.id === id)
}

export function getNextModule(currentId: string) {
    // Find which course the module belongs to
    const course = courses.find(c => c.modules.some(m => m.id === currentId))
    if (!course) return null

    const index = course.modules.findIndex(m => m.id === currentId)
    if (index !== -1 && index < course.modules.length - 1) {
        return course.modules[index + 1]
    }
    return null
}

export function getCourseByModuleId(moduleId: string) {
    return courses.find(c => c.modules.some(m => m.id === moduleId))
}
