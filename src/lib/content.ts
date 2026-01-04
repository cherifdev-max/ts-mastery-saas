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
    // 1. Introduction
    {
        id: "intro",
        title: "1.1 Introduction & Env",
        content: "# De Zéro à Héros : Introduction\n\nBienvenue dans votre parcours pour devenir un expert TypeScript.\n\n### Objectif du cours\nNous allons partir de zéro (aucune connaissance requise en TS) pour arriver à maîtriser les concepts les plus avancés du langage.\n\n### L'essentiel à retenir (Débutant) 💡\n- **TypeScript** n'est pas un nouveau langage, c'est du JavaScript avec des **types** en plus.\n- Il sert à attraper les erreurs **avant** d'exécuter le code.\n- Tout code JavaScript valide est aussi du code TypeScript valide.\n\n### Exercice\nDéclarez une variable `welcome` contenant la chaîne de caractères \"Hello TypeScript\".",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+welcome\\s*(:\\s*string)?\\s*=\\s*['\"]Hello TypeScript['\"]",
            message: "Vous devez déclarer une variable 'welcome' égale à 'Hello TypeScript'."
        }
    },
    {
        id: "intro-variables",
        title: "1.2 Const vs Let",
        content: "# Const vs Let\n\n### Pourquoi éviter `var` ?\n`var` a une portée globale ou de fonction assez floue. En TypeScript (et JS moderne), on préfére :\n- `const` : Pour ce qui ne change pas.\n- `let` : Pour ce qui peut changer.\n\n### Exercice\nDéclarez une constante `PI` avec la valeur `3.14`.",
        validation: {
            type: "regex",
            value: "const\\s+PI\\s*=\\s*3\\.14",
            message: "Déclarez une constante PI valant 3.14."
        }
    },
    {
        id: "intro-template",
        title: "1.3 Template Literals",
        content: "# Template Literals\n\n### Adieu la concaténation !\nFini les `\"Hello \" + name + \" !\"`. Utilisez les backticks ` ` ` pour insérer des variables directement.\n\nExemple : `` `Hello ${name}` ``\n\n### Exercice\nCréez une variable `greeting` qui utilise des backticks pour dire \"Hello World\".",
        validation: {
            type: "regex",
            value: "(`.*`)|(backtick)", // Simplified check, regex for backticks is tricky in string literals
            message: "Utilisez les backticks (`) pour créer votre chaîne."
        }
    },

    // 2. Types
    {
        id: "types",
        title: "2.1 Les types de base",
        content: "# Les Fondations : Types de base\n\nPour devenir expert, il faut des bases solides. TypeScript est avant tout une question de *types*.\n\n### L'essentiel à retenir (Débutant) 💡\n- Les types de base sont : `string` (texte), `number` (nombre), `boolean` (vrai/faux).\n- Le type `any` désactive la sécurité de TypeScript. **Évitez-le** autant que possible !\n\n### Exercice\nCréez une variable `age` de type `number` valant `25`.",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+age\\s*:\\s*number\\s*=\\s*25",
            message: "Déclarez une variable 'age' explicitement typée 'number' avec la valeur 25."
        }
    },
    {
        id: "types-boolean",
        title: "2.2 Booléens",
        content: "# Vrai ou Faux ?\n\nLe type `boolean` ne peut prendre que deux valeurs : `true` ou `false`.\n\n### Exercice\nDéclarez une variable `isActive` de type `boolean` initialisée à `true`.",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+isActive\\s*:\\s*boolean\\s*=\\s*true",
            message: "Déclarez 'isActive' de type boolean à true."
        }
    },
    {
        id: "types-arrays",
        title: "2.3 Tableaux",
        content: "# Listes et Tableaux\n\nPour déclarer une liste, ajoutez `[]` après le type.\n- `string[]` : Liste de textes.\n- `number[]` : Liste de nombres.\n\n### Exercice\nCréez un tableau `scores` contenant des nombres (ex: `[10, 20]`).",
        validation: {
            type: "regex",
            value: "(const|let|var)\\s+scores\\s*:\\s*number\\[\\]\\s*=",
            message: "Déclarez un tableau 'scores' de type number[]."
        }
    },

    // 3. Functions
    {
        id: "functions",
        title: "3.1 Fonctions basiques",
        content: "# Typage des Fonctions\n\n### L'essentiel à retenir (Débutant) 💡\n- On doit dire à TypeScript quel type d'arguments notre fonction attend.\n- On doit aussi dire ce que la fonction retourne (après les parenthèses).\n\n### Exercice\nÉcrivez une fonction `add` qui prend deux arguments `a` et `b` (tous deux de type `number`) et retourne un `number`.",
        validation: {
            type: "regex",
            value: "function\\s+add\\s*\\(\\s*a\\s*:\\s*number\\s*,\\s*b\\s*:\\s*number\\s*\\)\\s*:\\s*number",
            message: "Définissez la fonction 'add(a: number, b: number): number'."
        }
    },
    {
        id: "functions-optional",
        title: "3.2 Paramètres Optionnels",
        content: "# Arguments Optionnels\n\nParfois, un argument n'est pas obligatoire. On utilise `?`.\n\n```typescript\nfunction hello(name?: string) { ... }\n```\n\n### Exercice\nCréez une fonction `greet` avec un argument optionnel `name` (string).",
        validation: {
            type: "regex",
            value: "function\\s+greet\\s*\\(\\s*name\\?\\s*:\\s*string",
            message: "Utilisez 'name?: string' pour rendre l'argument optionnel."
        }
    },
    {
        id: "functions-return",
        title: "3.3 Type de Retour (Void)",
        content: "# Ne rien retourner\n\nSi une fonction ne retourne rien (elle fait juste un `console.log` par exemple), son type de retour est `void`.\n\n### Exercice\nCréez une fonction `logMessage` qui prend un `message` (string) et retourne `void`.",
        validation: {
            type: "regex",
            value: "\\)\\s*:\\s*void",
            message: "Le type de retour doit être précisé comme ': void'."
        }
    },

    // 4. Classes
    {
        id: "classes",
        title: "4.1 Classes & Propriétés",
        content: "# Programmation Orientée Objet\n\n### L'essentiel à retenir (Débutant) 💡\n- Une **Classe** est un plan pour construire des objets.\n\n### Exercice\nCréez une classe `User` avec une propriété publique `name` (string).",
        validation: {
            type: "includes",
            value: "class User",
            message: "Vous devez définir une classe nommée 'User'."
        }
    },
    {
        id: "classes-constructor",
        title: "4.2 Le Constructeur",
        content: "# Initialisation\n\nLe `constructor` est appelé quand on fait `new User()`. C'est là qu'on initialise les valeurs.\n\nAstuce TypeScript : Vous pouvez déclarer les propriétés directement dans les arguments du constructeur avec `public` ou `private` !\n\n### Exercice\nAjoutez un constructor à une classe `Car` qui prend une propriété `public model: string`.",
        validation: {
            type: "regex",
            value: "constructor\\s*\\(\\s*public\\s+model\\s*:\\s*string\\s*\\)",
            message: "Utilisez la syntaxe raccourcie 'constructor(public model: string)'."
        }
    },
    {
        id: "classes-methods",
        title: "4.3 Méthodes",
        content: "# Comportement\n\nLes objets ne font pas que stocker des données, ils agissent !\n\n### Exercice\nDans une classe `Counter`, ajoutez une méthode `increment()` qui ne retourne rien.",
        validation: {
            type: "regex",
            value: "increment\\s*\\(\\s*\\)\\s*",
            message: "Définissez une méthode increment()."
        }
    },

    // 5. Interfaces
    {
        id: "interfaces",
        title: "5.1 Interfaces",
        content: "# Structurer la donnée\n\n### L'essentiel à retenir (Débutant) 💡\n- Une **Interface** est un contrat.\n- C'est la fonctionnalité la plus utilisée pour décrire vos données.\n\n### Exercice\nDéfinissez une interface `Product` avec un `id` (number) et un `name` (string).",
        validation: {
            type: "includes",
            value: "interface Product",
            message: "L'interface 'Product' est manquante."
        }
    },
    {
        id: "interfaces-optional",
        title: "5.2 Propriétés Optionnelles",
        content: "# Pas toujours là...\n\nComme pour les fonctions, les interfaces peuvent avoir des champs optionnels avec `?`.\n\n### Exercice\nDans une interface `Config`, ajoutez une propriété `debug?: boolean`.",
        validation: {
            type: "regex",
            value: "debug\\?\\s*:\\s*boolean",
            message: "Déclarez 'debug?: boolean'."
        }
    },
    {
        id: "interfaces-readonly",
        title: "5.3 Readonly",
        content: "# Touche pas à ça !\n\nVous pouvez empêcher la modification d'une propriété après sa création avec `readonly`.\n\n### Exercice\nCréez une interface `Account` avec un `readonly id: number`.",
        validation: {
            type: "regex",
            value: "readonly\\s+id\\s*:\\s*number",
            message: "Utilisez le modificateur 'readonly' sur 'id'."
        }
    },

    // 6. Unions & Alias
    {
        id: "unions",
        title: "6.1 Unions",
        content: "# Unions & Aliases\n\n### L'essentiel à retenir (Débutant) 💡\n- L'**Union** (`|`) veut dire \"OU\". `string | number` = \"soit un texte, soit un nombre\".\n\n### Exercice\nCréez un Type Alias `Status` qui peut être soit \"success\" soit \"error\".",
        validation: {
            type: "regex",
            value: "type\\s+Status\\s*=\\s*(\"success\"\\s*\\|\\s*\"error\"|\"error\"\\s*\\|\\s*\"success\")",
            message: "Définissez le type 'Status' comme l'union de 'success' et 'error'."
        }
    },
    {
        id: "unions-literal",
        title: "6.2 Types Littéraux",
        content: "# Valeurs Exactes\n\nTypeScript permet d'utiliser des valeurs exactes comme types.\n\nExemple : `type Direction = \"North\" | \"South\";`\n\n### Exercice\nDéfinissez un type `YesNo` valant \"OUI\" ou \"NON\".",
        validation: {
            type: "regex",
            value: "type\\s+YesNo\\s*=\\s*(\"OUI\"\\s*\\|\\s*\"NON\"|\"NON\"\\s*\\|\\s*\"OUI\")",
            message: "Le type YesNo doit être 'OUI' | 'NON'."
        }
    },
    {
        id: "unions-alias",
        title: "6.3 Alias d'Objets",
        content: "# Nommer les choses\n\nPlutôt que de répéter `{ x: number, y: number }` partout, donnez-lui un nom !\n\n### Exercice\nCréez un type `Point` pour un objet ayant `x` et `y` (nombres).",
        validation: {
            type: "regex",
            value: "type\\s+Point\\s*=\\s*\\{",
            message: "Définissez un 'type Point = { ... }'."
        }
    },

    // 7. Generics
    {
        id: "generics",
        title: "7.1 Génériques",
        content: "# Niveau Intermédiaire : Les Génériques\n\n### L'essentiel à retenir (Débutant) 💡\n- Les **Génériques** (`<T>`) permettent de créer du code qui s'adapte.\n\n### Exercice\nCréez une fonction `identity<T>` qui retourne son argument.",
        validation: {
            type: "includes",
            value: "<T>",
            message: "Utilisez la syntaxe générique <T>."
        }
    },
    {
        id: "generics-interface",
        title: "7.2 Interfaces Génériques",
        content: "# Boîtes Flexibles\n\nOn peut aussi rendre les interfaces flexibles.\n\n```typescript\ninterface Box<T> {\n  content: T;\n}\n```\n\n### Exercice\nDéfinissez une interface `Wrapper<T>` avec une propriété `value: T`.",
        validation: {
            type: "regex",
            value: "interface\\s+Wrapper\\s*<\\s*T\\s*>",
            message: "Créez l'interface Wrapper<T>."
        }
    },
    {
        id: "generics-array",
        title: "7.3 Array<T>",
        content: "# Tableaux Génériques\n\nSaviez-vous que `number[]` est un raccourci pour `Array<number>` ?\n\n### Exercice\nDéclarez une variable `names` en utilisant la syntaxe `Array<string>`.",
        validation: {
            type: "regex",
            value: "Array\\s*<\\s*string\\s*>",
            message: "Utilisez explicitement 'Array<string>'."
        }
    },

    // 8. Namespaces
    {
        id: "namespaces",
        title: "8.1 Namespaces",
        content: "# Organisation\n\n### L'essentiel à retenir (Débutant) 💡\n- Les **Namespaces** servent à ranger votre code dans des \"casiers\" pour éviter les conflits de noms.\n\n### Exercice\nUtilisez le mot-clé `namespace` pour créer un espace `Utils`.",
        validation: {
            type: "includes",
            value: "namespace Utils",
            message: "Créez un namespace appelé 'Utils'."
        }
    },
    {
        id: "namespaces-nested",
        title: "8.2 Imbrication",
        content: "# Poupées Russes\n\nVous pouvez mettre des namespaces dans des namespaces.\n\n### Exercice\nDans un namespace `App`, créez un sous-namespace `Models` (n'oubliez pas `export`!).",
        validation: {
            type: "regex",
            value: "export\\s+namespace\\s+Models",
            message: "Utilisez 'export namespace Models' à l'intérieur."
        }
    },
    {
        id: "namespaces-export",
        title: "8.3 Exporter le contenu",
        content: "# Rendre accessible\n\nPour utiliser ce qu'il y a dans le namespace, il faut l'`export`er.\n\n### Exercice\nDans un namespace, exportez une fonction `init()`.",
        validation: {
            type: "regex",
            value: "export\\s+function\\s+init",
            message: "Exportez la fonction init."
        }
    },

    // 9. Advanced Types
    {
        id: "advanced-types",
        title: "9.1 Partial",
        content: "# Niveau Expert : Types Avancés\n\n### L'essentiel à retenir (Débutant) 💡\n- `Partial<T>` est un outil magique qui prend un type et rend tous ses champs optionnels.\n\n### Exercice\nUtilisez `Partial<T>` pour créer un type qui rend toutes les propriétés optionnelles.",
        validation: {
            type: "includes",
            value: "Partial<",
            message: "Utilisez l'utilitaire Partial<T>."
        }
    },
    {
        id: "advanced-pick",
        title: "9.2 Pick",
        content: "# Choisir ses batailles\n\n`Pick<T, K>` permet de créer un nouveau type en ne gardant que certaines clés de `T`.\n\n```typescript\ntype NameOnly = Pick<User, \"name\">;\n```\n\n### Exercice\nUtilisez `Pick` pour sélectionner une propriété 'id'.",
        validation: {
            type: "includes",
            value: "Pick<",
            message: "Utilisez l'utilitaire 'Pick'."
        }
    },
    {
        id: "advanced-omit",
        title: "9.3 Omit",
        content: "# Exclure\n\nL'inverse de Pick est `Omit<T, K>`. On prend tout... sauf ça.\n\n### Exercice\nUtilisez `Omit` pour retirer la propriété 'password'.",
        validation: {
            type: "includes",
            value: "Omit<",
            message: "Utilisez l'utilitaire 'Omit'."
        }
    },

    // 10. Decorators
    {
        id: "decorators",
        title: "10.1 Décorateurs",
        content: "# Méta-programmation\n\n### L'essentiel à retenir (Débutant) 💡\n- Un **Décorateur** commence par `@` (ex: `@Component`).\n\n### Exercice\nCréez une fonction `@Log` (simple fonction pour l'instant).",
        validation: {
            type: "includes",
            value: "function Log",
            message: "Définissez une fonction nommée Log."
        }
    },
    {
        id: "decorators-class",
        title: "10.2 Décorateur de Classe",
        content: "# Sur une classe\n\nUn décorateur de classe reçoit le constructeur de la classe en argument.\n\n### Exercice\nAppliquez `@Sealed` sur une classe `Person`.",
        validation: {
            type: "regex",
            value: "@Sealed\\s+class\\s+Person",
            message: "Appliquez @Sealed juste avant 'class Person'."
        }
    },
    {
        id: "decorators-prop",
        title: "10.3 Décorateur de Propriété",
        content: "# Sur une propriété\n\nOn peut aussi décorer des champs.\n\n### Exercice\nAppliquez `@Required` sur une propriété `email`.",
        validation: {
            type: "regex",
            value: "@Required\\s+email",
            message: "Appliquez @Required sur 'email'."
        }
    },

    // 11. Migration
    {
        id: "migration",
        title: "11.1 Migration JS vers TS",
        content: "# Le Test Ultime : Migration\n\n### L'essentiel à retenir (Débutant) 💡\n- Pas de panique ! On ne migre pas tout d'un coup.\n\n### Exercice\nÉcrivez `// EXPERT` pour valider.",
        validation: {
            type: "includes",
            value: "// EXPERT",
            message: "Écrivez le commentaire // EXPERT pour finir."
        }
    },
    {
        id: "migration-as",
        title: "11.2 Type Assertion",
        content: "# Forcez le destin\n\nParfois, vous en savez plus que le compilateur. Vous pouvez utiliser `as` pour forcer un type.\n\n```typescript\nconst input = document.getElementById('foo') as HTMLInputElement;\n```\n\n### Exercice\nUtilisez le mot-clé `as` pour caster une variable.",
        validation: {
            type: "regex",
            value: "\\s+as\\s+",
            message: "Utilisez le mot-clé 'as'."
        }
    },
    {
        id: "migration-any",
        title: "11.3 Le joker Any",
        content: "# Le mal nécessaire\n\nParfois, lors d'une migration, on ne sait pas. `any` permet de dire \"on verra plus tard\".\n\n### Exercice\nDéclarez une variable `mystery` de type `any`.",
        validation: {
            type: "regex",
            value: "mystery\\s*:\\s*any",
            message: "Déclarez 'mystery: any'."
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
        title: "Java POO Express",
        description: "Maîtrisez les fondamentaux de la POO et les meilleures pratiques de conception.",
        image: "/images/java.png",
        icon: Server,
        modules: [
            {
                id: "java-poo",
                title: "1. Les 4 Piliers",
                content: "# 🚀 Java POO Express : Les Fondamentaux\n\n**Objectif** : Comprendre rapidement les mécanismes de Java.\n\n## Les Quatre Piliers de la POO\n\nLa Programmation Orientée Objet repose sur quatre concepts fondamentaux :\n\n| Pilier | Définition Simple |\n| :--- | :--- |\n| **1. Abstraction** | Cacher les détails inutiles pour ne montrer que l'essentiel. |\n| **2. Encapsulation** | Regrouper données et méthodes, et protéger l'accès (via `private`). |\n| **3. Héritage** | Réutiliser les propriétés d'une classe existante (Relation \"Est-un\"). |\n| **4. Polymorphisme**| Une seule interface pour gérer différents types d'objets. |\n\n### Exercice\nDéclarez une classe vide nommée `Concept` pour commencer.",
                validation: {
                    type: "regex",
                    value: "class\\s+Concept",
                    message: "Déclarez une classe nommée `Concept`."
                }
            },
            {
                id: "java-objects",
                title: "2. Objets & Références",
                content: "# Travailler avec les Objets\n\n## Primitives vs Objets\n- **Primitive** (`int`, `boolean`): Stocke la valeur.\n- **Objet** (`String`, `Alarm`): Stocke une référence (adresse mémoire).\n\n## Attention au `null`\nUne variable d'objet peut être `null` (ne pointe vers rien). Appeler une méthode dessus provoque une `NullPointerException` (Le cauchemar des dévs Java !).\n\n### Exercice\nInstanciez un objet avec le mot-clé `new` (ex: `new Object()`).",
                validation: {
                    type: "includes",
                    value: "new ",
                    message: "Utilisez le mot-clé `new` pour créer une instance."
                }
            },
            {
                id: "java-classes",
                title: "3. Class & Encapsulation",
                content: "# Définition et Contrôle des Classes\n\n## Structure\nUne classe regroupe des **Champs** (état) et des **Méthodes** (comportement).\n\n## Encapsulation (Règle d'or)\nRendez vos champs `private` ! Le monde extérieur ne doit passer que par vos méthodes `public`.\n\n### Exercice\nCréez une classe avec un champ `private String secret;`.",
                validation: {
                    type: "regex",
                    value: "private\\s+String\\s+secret",
                    message: "Déclarez un champ `private String secret`."
                }
            },
            {
                id: "java-relationships",
                title: "4. Héritage & Polymorphisme",
                content: "# Relation entre Classes\n\n## Héritage\nUtilisez `extends` pour créer une sous-classe. Elle hérite de tout ce qui n'est pas privé.\n\n## Polymorphisme\nC'est la capacité du code à s'adapter à la sous-classe réelle, même si on manipule le type parent.\n\nTo `Downcast` (forcer le type enfant) est souvent signe d'un mauvais design.\n\n### Exercice\nCréez une classe `Dog` qui étend `Animal` (`class Dog extends Animal`).",
                validation: {
                    type: "regex",
                    value: "class\\s+Dog\\s+extends\\s+Animal",
                    message: "Créez une classe `Dog` qui hérite de `Animal`."
                }
            },
            {
                id: "java-best-practices",
                title: "5. Best Practices & Static",
                content: "# Derniers Conseils\n\n### Utilisation de `static`\n- **Règle** : Utilisez `static` avec parcimonie.\n- **Danger** : Les champs `public static` sont des variables globales déguisées. C'est pratique, mais ça rend le code difficile à tester et moins \"Objet\".\n\n### Exercice\nDéclarez une méthode statique `static void main(String[] args)` (le point d'entrée classique).",
                validation: {
                    type: "includes",
                    value: "static void main",
                    message: "Déclarez la méthode `static void main`."
                }
            },
            {
                id: "java-se-basics",
                title: "6. Java SE : Bases & Syntaxe",
                content: "# ☕ Cours 2: Fondamentaux de Java SE (Partie 1)\n\n> 🎥 **[Vidéo Complète du Cours](https://drive.google.com/file/d/1ePwv-HzrtpJJsCknmF85hy4szhBJvyd4/view?usp=sharing)**\n\n## 1. Première App & Syntaxe\n- **Main**: Point d'entrée `public static void main`.\n- **Paquets**: Organisation du code.\n\n## 2. Variables & Types\nTypes primitifs clés : `int`, `double`, `boolean`, `char`. Attention aux plages de valeurs !\n\n## 3. Logique & Boucles\n- `if`, `else`, `switch`.\n- `while`, `do-while`, `for`, `for-each`.\n\n## 4. Méthodes & String\n- Une méthode contient du code réutilisable.\n- `String` est immuable. Utilisez `StringBuilder` pour concaténer beaucoup de texte.\n\n### Exercice\nDéclarez une variable `int count = 10;` et une `String name = \"Java\";`.",
                validation: {
                    type: "regex",
                    value: "int\\s+count\\s*=\\s*10.*String\\s+name\\s*=\\s*\"Java\"",
                    message: "Déclarez `int count = 10;` et `String name = \"Java\";`."
                }
            },
            {
                id: "java-se-advanced",
                title: "7. Java SE : Classes Avancées",
                content: "# ☕ Cours 2: Fondamentaux de Java SE (Partie 2)\n\n## 7. Classes & Objets\nUne classe est un plan (blueprint). `Encapsulation` : Cachez vos données avec `private`.\nModificateurs : `public`, `protected`, `private`.\n\n## 8. Constructeurs\nCode exécuté au `new`. Utilisez `this()` pour appeler un autre constructeur.\n\n## 9. Membres Statiques\n`static` appartient à la classe, pas à l'instance.\n\n## 10. Annotations\n`@Override`, `@Deprecated`. Métadonnées pour le compilateur.\n\n### Exercice\nCréez un constructeur qui utilise `this.name = val;`.",
                validation: {
                    type: "regex",
                    value: "this\\.[a-zA-Z0-9_]+\\s*=",
                    message: "Utilisez `this.champ = valeur` dans le constructeur."
                }
            },
            {
                id: "java-se-streams",
                title: "8. Java SE : Streams Modernes",
                content: "# ☕ Cours 2: Fondamentaux de Java SE (Partie 3)\n\n## 12. Streams & Lambdas\nUne façon moderne de traiter les collections (depuis Java 8).\n\n### L'analogie de l'Usine\n- **Stream** : Le tapis roulant.\n- **Filter** : Contrôle qualité (garde ou jette).\n- **Map** : Transformation.\n- **Collect** : Emballage final.\n\n### Code Moderne\nPlus de boucles `for` complexes. Décrivez le **QUOI** (Declarative) plutôt que le **COMMENT** (Imperative).\n\n```java\nlist.stream()\n    .filter(n -> n % 2 == 0)\n    .collect(Collectors.toList());\n```\n\n### Exercice\nUtilisez `.stream().filter(...)` sur une liste.",
                validation: {
                    type: "regex",
                    value: "\\.stream\\(\\)\\s*\\.filter\\(",
                    message: "Utilisez `.stream().filter(...)`."
                }
            },
            {
                id: "java-21-threads",
                title: "9. Java 21 : Threads Virtuels",
                content: "# 🚀 Java 21 : Les Threads Virtuels\n\n## L'Analogie des Livreurs 📦\nImaginez une entreprise de livraison.\n- **Camions** (Platform Threads) : Limités, coûteux.\n- **Livreurs** (Virtual Threads) : Illimités, légers.\n\nAvec les threads virtuels, quand un livreur attend une réponse (bloquant), il descend du camion. Le camion sert à quelqu'un d'autre. Résultat : On peut gérer des millions de tâches simultanées !\n\n### Code Non-Bloquant\n```java\nThread.ofVirtual().start(() -> {\n    System.out.println(\"Je suis ultra-léger !\");\n});\n```\n\n### Exercice\nLancez un thread avec `Thread.ofVirtual().start(...)`.",
                validation: {
                    type: "regex",
                    value: "Thread\\.ofVirtual\\(\\)\\.start",
                    message: "Utilisez `Thread.ofVirtual().start(...)`."
                }
            },
            {
                id: "java-21-patterns",
                title: "10. Java 21 : Pattern Matching",
                content: "# 🧐 Pattern Matching & Records\n\n## Le Triage Intelligent\nFinis les casts complexes !\n\n### Avant (Java < 16)\n```java\nif (obj instanceof String) {\n    String s = (String) obj;\n    return s.length();\n}\n```\n\n### Après (Pattern Matching)\n```java\nif (obj instanceof String s) {\n    return s.length();\n}\n```\n\n### Record Patterns\nSi vous avez un record `Person(String name, int age)` :\n```java\nif (obj instanceof Person(String name, int age)) {\n    return name.toUpperCase();\n}\n```\n\n### Exercice\nUtilisez le pattern matching : `if (obj instanceof String s)`.",
                validation: {
                    type: "regex",
                    value: "instanceof\\s+[a-zA-Z0-9_]+\\s+[a-zA-Z0-9_]+",
                    message: "Utilisez la syntaxe `instanceof Type variable`."
                }
            },
            {
                id: "java-21-collections",
                title: "11. Java 21 : Collections Unified",
                content: "# 📚 Collections Séquencées\n\n## Un Annuaire Unifié\nAvant Java 21, récupérer le premier élément dépendait du type de liste (`get(0)`, `first()`, `getFirst()`, etc.).\n\nMaintenant, l'interface `SequencedCollection` unifie tout !\n\n### Méthodes Universelles\n- `getFirst()` / `getLast()`\n- `addFirst()` / `addLast()`\n- `removeFirst()` / `removeLast()`\n\n```java\nSequencedCollection<String> list = new ArrayList<>();\nlist.addFirst(\"Premier !\");\n```\n\n### Exercice\nAppelez la méthode `.getFirst()` sur une collection.",
                validation: {
                    type: "regex",
                    value: "\\.getFirst\\(\\)",
                    message: "Utilisez la méthode `.getFirst()`."
                }
            },
            {
                id: "java-advanced",
                title: "12. Java Avancé",
                content: "# 📜 Fonctionnalités Avancées\n\n> 🎬 **[Vidéo Récapitulative](https://drive.google.com/file/d/1o-bEyyDgIbMLw0fcCBmwE4jYJmF64Z1B/view?usp=sharing)**\n\n## 1. Génériques Avancés\nCréez des boîtes typées : `Box<T>`. Évitez les erreurs de cast !\n\n## 2. Records 📦\nRaccourcis pour objets immuables : `public record Person(String name) {}`.\nDites adieu aux getters/setters/equals/hashCode infinis.\n\n## 3. Interfaces Scellées (Sealed)\nContrôlez qui peut hériter de vos classes : `sealed interface Shape permits Circle, Square`.\n\n## 4. Optional\nUne boîte qui peut être vide. Forcez la gestion du cas \"absent\" sans `NullPointerException`.\n\n### Exercice\nDéclarez un record : `record Point(int x, int y) {}`.",
                validation: {
                    type: "regex",
                    value: "record\\s+[a-zA-Z0-9_]+\\(.*\\)",
                    message: "Déclarez un record, par exemple `record Point(int x, int y) {}`."
                }
            },
            {
                id: "java-functional",
                title: "13. Penser Fonctionnel",
                content: "# 🧘 Penser Fonctionnel en Java\n\n> 🎬 **[Vidéo : Penser Fonctionnel](https://drive.google.com/file/d/19pd_2wBztm-SAB1mmrfca3HxvaSSNfib/view?usp=sharing)**\n\n## Le Paradigme Fonctionnel\nFocalisez-vous sur le **QUOI** (transformations) plutôt que le **COMMENT** (boucles).\n\n## Fonctions Pures\nComme une calculatrice parfaite : `2+2` fait toujours `4`. Pas d'effets de bord (pas de println, pas de modif de variable globale).\n\n## Monades\nDes boîtes magiques (`Optional`, `Stream`, `CompletableFuture`) pour chainer des opérations (`flatMap`) en toute sécurité.\n\n### Exercice\nCréez un Optional : `Optional.of(\"Java\")`.",
                validation: {
                    type: "includes",
                    value: "Optional.of",
                    message: "Utilisez `Optional.of(...)`."
                }
            },
            {
                id: "java-async",
                title: "14. Async & CompletableFuture",
                content: "# 🚀 Programmation Asynchrone\n\n## C'est quoi, Asynchrone ?\n- **Synchrone** : Attendre le gâteau devant le four. 🐢\n- **Asynchrone** : Faire la vaisselle en attendant que ça cuise. ⚡️\n\n## L'outil : `CompletableFuture`\nC'est une promesse de résultat futur.\n\n### supplyAsync\n```java\nCompletableFuture.supplyAsync(() -> {\n    // Simulation tâche longue\n    return \"Gateau prêt\";\n});\n```\n\n### Chaîner avec `thenApply`\n```java\nfuture.thenApply(g -> g + \" décoré\");\n```\n\n### Combiner avec `allOf`\nAttendre que le riz, le poulet et les légumes soient cuits.\n\n### Exercice\nUtilisez `CompletableFuture.supplyAsync`.",
                validation: {
                    type: "regex",
                    value: "CompletableFuture\\.supplyAsync",
                    message: "Utilisez `CompletableFuture.supplyAsync`."
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
                id: "spring-ioc",
                title: "1. Architecture & IoC",
                content: `
# 🏗️ Spring Core : L'Inversion de Contrôle

## Le principe Hollywood
"Ne nous appelez pas, on vous appellera."

Dans Spring, vous ne faites pas de \`new Service()\`. C'est le framework (le Conteneur) qui crée les objets pour vous.

### Injection de Dépendance (DI)
Utilisez \`@Autowired\` (ou mieux, le constructeur) pour demander des dépendances.

\`\`\`java
@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

### Principales Annotations
- \`@Component\`, \`@Service\`, \`@Repository\` : Pour définir des beans.
- \`@Configuration\` + \`@Bean\` : Pour configurer manuellement.

### Exercice
Créez une classe annotée avec \`@Service\`.
`,
                validation: {
                    type: "includes",
                    value: "@Service",
                    message: "Annotez votre classe avec @Service."
                }
            },
            {
                id: "spring-web",
                title: "2. REST API Professionnelle",
                content: `
# 🌐 Construire une API REST

## Contrôleurs Modernes
On utilise \`@RestController\` pour renvoyer du JSON automatiquement.

### Verbes HTTP & Bonnes Pratiques
- **GET** \`/users\` : Lire
- **POST** \`/users\` : Créer (Retourner 201 Created)
- **PUT** \`/users/{id}\` : Remplacer tout
- **PATCH** \`/users/{id}\` : Modifier partiellement
- **DELETE** \`/users/{id}\` : Supprimer

### ResponseEntity
Ne renvoyez pas juste l'objet. Renvoyez un statut HTTP !

\`\`\`java
@PostMapping("/users")
public ResponseEntity<User> create(@RequestBody User u) {
    return ResponseEntity.status(201).body(service.save(u));
}
\`\`\`

### Exercice
Créez une méthode annotée avec \`@PostMapping\`.
`,
                validation: {
                    type: "includes",
                    value: "@PostMapping",
                    message: "Utilisez l'annotation @PostMapping."
                }
            },
            {
                id: "spring-data",
                title: "3. Persistance JPA",
                content: `
# 💾 Spring Data JPA

## L'ORM Facile
Plus besoin d'écrire de SQL pour les opérations de base.

### 1. L'Entité
C'est votre table en base de données.
\`\`\`java
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String email;
}
\`\`\`

### 2. Le Repository
C'est la magie de Spring Data.
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring génère le SQL pour vous !
    List<User> findByEmail(String email);
}
\`\`\`

### Exercice
Créez une interface qui étend \`JpaRepository\`.
`,
                validation: {
                    type: "regex",
                    value: "extends\\s+JpaRepository",
                    message: "Votre interface doit étendre JpaRepository."
                }
            },
            {
                id: "spring-validation",
                title: "4. Validation & Erreurs",
                content: `
# 🛡️ Qualité & Robustesse

## Validation des Entrées
Ne faites pas confiance au client ! Utilisez Bean Validation.

\`\`\`java
public record UserDto(
    @NotBlank String name,
    @Email String email
) {}
\`\`\`

Ensuite, dans le contrôleur : \`create(@Valid @RequestBody UserDto dto)\`.

## Gestion Globale des Erreurs
Utilisez \`@ControllerAdvice\` pour capturer les exceptions partout.

### Exercice
Utilisez l'annotation \`@Valid\` dans une signature de méthode.
`,
                validation: {
                    type: "includes",
                    value: "@Valid",
                    message: "Utilisez l'annotation @Valid."
                }
            },
            {
                id: "spring-test",
                title: "5. Tests Automatisés",
                content: `
# 🧪 Tester son API

## @SpringBootTest et MockMvc
Pour tester vos contrôleurs sans lancer tout le serveur.

\`\`\`java
@SpringBootTest
@AutoConfigureMockMvc
class ApiTest {
    @Autowired MockMvc mvc;

    @Test
    void shouldReturnUsers() {
        mvc.perform(get("/api/users"))
           .andExpect(status().isOk());
    }
}
\`\`\`

### Exercice
Utilisez \`@SpringBootTest\` sur votre classe de test.
`,
                validation: {
                    type: "includes",
                    value: "@SpringBootTest",
                    message: "Annotez la classe de test avec @SpringBootTest."
                }
            },
            {
                id: "spring-security",
                title: "6. Spring Security Basics",
                content: `
# 🔐 Sécuriser son API

## Le Gardien du Temple
Spring Security intercepte chaque requête pour vérifier :
1. **Qui êtes-vous ?** (Authentification)
2. **Avez-vous le droit ?** (Autorisation)

### SecurityFilterChain
Depuis Spring Boot 3, on configure tout via des Beans.

\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/public/**").permitAll()
            .anyRequest().authenticated()
        )
        .httpBasic(Customizer.withDefaults())
        .build();
}
\`\`\`

### Exercice
Utilisez \`authorizeHttpRequests\` dans une configuration.
`,
                validation: {
                    type: "includes",
                    value: "authorizeHttpRequests",
                    message: "Utilisez la méthode authorizeHttpRequests."
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
                id: "angular-components",
                title: "1. Composants & Signals",
                content: `
# 🅰️ Angular : La Révolution Signals

## Tout est Composant
Une application Angular est un arbre de composants.

### Component Standalone
Plus besoin de NgModules !
\`\`\`typescript
@Component({
  selector: 'app-user',
  standalone: true,
  template: \`<h1>Hello {{ name() }}</h1>\`,
})
export class UserComponent {
  // Les Signals : la nouvelle ère de la réactivité
  name = signal('Angular 18');

  updateName() {
    this.name.set('Simplicité');
  }
}
\`\`\`

### Exercice
Créez un Signal avec une valeur initiale de 0.
`,
                validation: {
                    type: "includes",
                    value: "signal(",
                    message: "Utilisez la fonction signal() pour créer une variable réactive."
                }
            },
            {
                id: "angular-directives",
                title: "2. Control Flow (@if, @for)",
                content: `
# 🔀 Le Nouveau Control Flow

## Adieu *ngIf, *ngFor !
Angular a une nouvelle syntaxe intégrée, plus rapide et plus lisible.

### Condition @if
\`\`\`html
@if (isVisible()) {
  <p>Coucou !</p>
} @else {
  <p>Caché...</p>
}
\`\`\`

### Boucle @for
\`\`\`html
<ul>
  @for (user of users(); track user.id) {
    <li>{{ user.name }}</li>
  } @empty {
    <li>Aucun utilisateur</li>
  }
</ul>
\`\`\`

### Exercice
Utilisez le bloc \`@if\` dans le template.
`,
                validation: {
                    type: "includes",
                    value: "@if",
                    message: "Utilisez la syntaxe @if pour les conditions."
                }
            },
            {
                id: "angular-services",
                title: "3. Services & Injection",
                content: `
# 💉 Injection de Dépendance

## Partager la Logique
Les composants gèrent la vue, les Services gèrent la donnée.

### Créer un Service
\`\`\`typescript
@Injectable({
  providedIn: 'root' // Disponible partout par défaut
})
export class UserService {
  getUsers() {
    return fetch('/api/users');
  }
}
\`\`\`

### Injecter le Service
\`\`\`typescript
export class UserComponent {
  // Injection moderne avec inject()
  private userService = inject(UserService);
}
\`\`\`

### Exercice
Créez une classe annotée avec \`@Injectable\`.
`,
                validation: {
                    type: "includes",
                    value: "@Injectable",
                    message: "Annotez votre classe avec @Injectable."
                }
            },
            {
                id: "angular-routing",
                title: "4. Routing & Navigation",
                content: `
# 🧭 Navigation

## Configurer les Routes
\`\`\`typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', redirectTo: 'home' }
];
\`\`\`

## Naviguer
Dans le HTML :
\`\`\`html
<a routerLink="/home">Accueil</a>
\`\`\`

Dans le code :
\`\`\`typescript
private router = inject(Router);
goHome() {
  this.router.navigate(['/home']);
}
\`\`\`

### Exercice
Utilisez \`routerLink\` dans une balise HTML.
`,
                validation: {
                    type: "includes",
                    value: "routerLink",
                    message: "Utilisez la directive routerLink."
                }
            },
            {
                id: "angular-forms",
                title: "5. Reactive Forms",
                content: `
# 📝 Formulaires Puissants

## Reactive Forms
Contrôle total sur la validation et l'état.

\`\`\`typescript
// FormControl pour un champ unique
email = new FormControl('', [Validators.required, Validators.email]);

// FormGroup pour un formulaire complet
profile = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
});
\`\`\`

Dans le template :
\`\`\`html
<input [formControl]="email" type="text" />
\`\`\`

### Exercice
Instanciez un \`new FormControl\`.
`,
                validation: {
                    type: "includes",
                    value: "new FormControl",
                    message: "Créez une instance de FormControl."
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
