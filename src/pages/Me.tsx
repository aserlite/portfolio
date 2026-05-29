export default function Me() {
  return (
    <div className="me-container">
      <h1 className="me-title">À propos de moi</h1>
      
      <div className="me-grid">
        <section className="me-block">
          <h2>Infos de base</h2>
          <ul className="me-list">
            <li><strong>Nom :</strong> Arthur</li>
            <li><strong>Rôle :</strong> Développeur Front-End Creative</li>
            <li><strong>Permis :</strong> Permis B</li>
            <li><strong>Localisation :</strong> France</li>
          </ul>
        </section>

        <section className="me-block">
          <h2>Passions</h2>
          <ul className="me-list">
            <li>Music / DJ</li>
            <li>Dev / Creative Coding</li>
            <li>Cars</li>
            <li>Tattoo</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
