export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">De Zéro à Expert TypeScript</h1>
      <p className="text-xl text-muted-foreground mb-8">
        La plateforme complète pour maîtriser TypeScript. Commencez par les bases et progressez jusqu'aux concepts les plus avancés.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-bold text-lg mb-2">Débutant</h3>
          <p className="text-sm text-muted-foreground">Apprenez la syntaxe, les types de base et la configuration.</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-bold text-lg mb-2">Intermédiaire</h3>
          <p className="text-sm text-muted-foreground">Maîtrisez les interfaces, les classes et les génériques.</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-bold text-lg mb-2">Expert</h3>
          <p className="text-sm text-muted-foreground">Domptez les types conditionnels, les décorateurs et l'architecture.</p>
        </div>
      </div>
    </div>
  );
}
