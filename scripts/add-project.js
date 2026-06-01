import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.resolve(__dirname, '../src/assets/data/projects.json');

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log('\n--- Ajout d\'un nouveau projet ---');

    // 1. Charger et parser le JSON existant
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`Le fichier projects.json est introuvable à l'adresse : ${jsonFilePath}`);
    }

    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const projects = JSON.parse(fileContent);

    // 2. Calculer le prochain ID
    const numericIds = projects.map(p => {
      const parsed = parseInt(p.id, 10);
      return isNaN(parsed) ? 0 : parsed;
    });
    const nextId = (Math.max(0, ...numericIds) + 1).toString();

    // 3. Poser les questions à l'utilisateur
    const title = await rl.question('Titre du projet : ');
    if (!title.trim()) {
      console.log('Erreur : Le titre du projet ne peut pas être vide.');
      rl.close();
      return;
    }

    const description = await rl.question('Description : ');

    const tagsInput = await rl.question('Tags (séparés par des virgules, ex: Front, Video) : ');
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    let coverImage = await rl.question('Nom de l\'image de couverture (ex: projet.jpg) : ');
    if (coverImage) {
      if (!coverImage.startsWith('/')) {
        coverImage = `/images/projects/${coverImage}`;
      }
    } else {
      coverImage = '/images/projects/default.jpg';
    }

    const github = await rl.question('Lien GitHub (optionnel) : ');
    const live = await rl.question('Lien Live (optionnel) : ');

    // 4. Créer le nouvel objet projet
    const newProject = {
      id: nextId,
      title: title.trim(),
      description: description.trim(),
      tags,
      coverImage,
      links: {
        ...(github.trim() ? { github: github.trim() } : {}),
        ...(live.trim() ? { live: live.trim() } : {})
      },
      gallery: []
    };

    // 5. Ajouter et sauvegarder
    projects.push(newProject);
    fs.writeFileSync(jsonFilePath, JSON.stringify(projects, null, 2), 'utf-8');

    console.log(`\n🎉 Projet "${newProject.title}" ajouté avec succès !`);
    console.log(`ID attribué : ${newProject.id}`);
    console.log(`Fichier mis à jour : ${jsonFilePath}\n`);

  } catch (error) {
    console.error('Une erreur est survenue lors de l\'ajout du projet :', error);
  } finally {
    rl.close();
  }
}

main();
