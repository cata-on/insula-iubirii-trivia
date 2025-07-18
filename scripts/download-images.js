const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Image URLs mapping - you'll need to fill these in with actual URLs
const imageUrls = {
  // Female Ispite
  "cristina-scarlevschi":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/cristina-scarlevschi-inspita-feminina-insula-iubirii-2025-antena-1-2-1368x2048.jpeg",
  "nicoleta-balint":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/nicoleta-balint-ispita-insula-iubirii-2025.jpg",
  "diandra-goleanu":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/diandra-goleanu-ispita-feminina-insula-iubirii-2025-antena-1-1.jpeg",
  "andreea-aurica":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/andreea-aurica-ispita-feminina-insula-iubirii-2025-antena-1-2-1368x2048.jpg",
  "naba-salem":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/naba-salem-ispita-feminina-insula-iubirii-2025-antena-1-1-1368x2048.jpg",
  "mihaela-mincu":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/mihaela-mincu-scaled.jpg",
  "andreea-craciun":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/06/andreea-craciun-1368x2048.jpg",
  amelia:
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/amelia-insula-iubirii-2025-1.jpg",
  "teodora-racos":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/teodora-racos-de-la-insula-iubirii-2025-4-1368x2048.jpg",

  // Male Ispite
  "catalin-brinza":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fcatalin-brinza-jpg-ockonyu8.jpg?w=800",
  "george-ivanescu":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fgeorge-ivanescu-jpg-xk6nvrjc.jpg?w=800",
  "narcis-bujor":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fnarcis-bujor-jpg-nr7av630.jpg?w=800",
  "mattia-carnessali":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fmattia-carnessali-jpg-6mh49san.jpg?w=800",
  "liviu-trif":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fliviu-trif-jpg-92b2kpk2.jpg?w=800",
  "sorin-encica":
    "https://img.a1.ro/?u=https%3A%2F%2Fa1.ro%2Fuploads%2Fmodules%2Fnews%2F0%2F2025%2F6%2F27%2F1138959%2Fsorin-encica-jpg-lo3wxbfl.jpg?w=800",

  // Couples
  "francesca-sarao":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/francesca-si-cristi-1-1368x2048.jpg",
  "cristi-punga":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/francesca-si-cristi-1-1368x2048.jpg",
  "maria-avram":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/maria-si-marius-avram-1.jpeg",
  "marius-avram":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/maria-si-marius-avram-1.jpeg",
  "bianca-dan":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/bianca-dan-si-marian-grozavu-insula-iubirii-2025.jpg",
  "marian-grozavu":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/bianca-dan-si-marian-grozavu-insula-iubirii-2025.jpg",
  "isabel-martinez-villa":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/isabel-martinez-villa-si-claudiu-borca-insula-iubirii-2025-1-1.jpg",
  "claudiu-borca":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/isabel-martinez-villa-si-claudiu-borca-insula-iubirii-2025-1-1.jpg",
  "ella-visan":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/ella-visan-si-andrei-lemnaru-insula-iubirii-2025-1-1.jpg",
  "andrei-lemnaru":
    "https://mediacdn.libertatea.ro/unsafe/870x0/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2025/07/ella-visan-si-andrei-lemnaru-insula-iubirii-2025-1-1.jpg",
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filepath}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      })
      .on("error", reject);
  });
}

async function downloadAllImages() {
  const baseDir = path.join(__dirname, "..", "public", "images");

  // Create directories if they don't exist
  const directories = [
    path.join(baseDir, "ispite_feminine"),
    path.join(baseDir, "ispite_masculine"),
    path.join(baseDir, "cupluri"),
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log("🚀 Starting image downloads...\n");

  for (const [participantId, url] of Object.entries(imageUrls)) {
    if (url === "URL_HERE") {
      console.log(`⏭️  Skipping ${participantId} - no URL provided`);
      continue;
    }

    try {
      // Determine the category based on participant ID
      let category = "cupluri";
      if (
        participantId.includes("cristina") ||
        participantId.includes("nicoleta") ||
        participantId.includes("diandra") ||
        participantId.includes("andreea") ||
        participantId.includes("naba") ||
        participantId.includes("mihaela") ||
        participantId.includes("amelia") ||
        participantId.includes("teodora")
      ) {
        category = "ispite_feminine";
      } else if (
        participantId.includes("catalin") ||
        participantId.includes("george") ||
        participantId.includes("narcis") ||
        participantId.includes("mattia") ||
        participantId.includes("liviu") ||
        participantId.includes("sorin")
      ) {
        category = "ispite_masculine";
      }

      const filepath = path.join(baseDir, category, `${participantId}.jpg`);
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${participantId}:`, error.message);
    }
  }

  console.log("\n✨ Download process completed!");
}

// Instructions for manual image extraction
console.log(`
📋 INSTRUCTIONS FOR IMAGE EXTRACTION:

1. Open the following websites in your browser:
   - https://www.libertatea.ro/entertainment/ispitele-feminine-insula-iubirii-2025-5382887
   - https://a1.ro/insula-iubirii/stiri/insula-iubirii-2025-lista-completa-si-detalii-despre-ispitele-masculine-din-sezonul-9-id1138959.html
   - https://www.libertatea.ro/entertainment/cine-sunt-cuplurile-de-la-insula-iubirii-2025-5382792

2. For each participant:
   - Right-click on their image
   - Select "Copy image address" or "Copy image URL"
   - Replace the corresponding 'URL_HERE' in this script

3. Run the script: node scripts/download-images.js

4. The images will be automatically downloaded and organized in the correct folders.
`);

// Uncomment the line below to run the download process
downloadAllImages();
