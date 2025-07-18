const fs = require("fs");
const path = require("path");

// Load our data
const ispiteFeminine = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "src", "data", "ispite_feminine.json"),
    "utf8"
  )
);
const ispiteMasculine = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "src", "data", "ispite_masculine.json"),
    "utf8"
  )
);
const cupluri = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "src", "data", "cupluri.json"),
    "utf8"
  )
);

console.log("🔍 VERIFYING PARTICIPANT DATA ACCURACY\n");

// Data verification checklist
const verificationChecklist = {
  ispiteFeminine: {
    total: 9,
    participants: [
      "Cristina Scarlevschi",
      "Nicoleta Balint",
      "Diandra Goleanu",
      "Andreea Aurică",
      "Naba Salem",
      "Mihaela Mincu",
      "Andreea Crăciun",
      "Amelia",
      "Teodora Racoș",
    ],
  },
  ispiteMasculine: {
    total: 6,
    participants: [
      "Cătălin Brînză",
      "George Ivănescu",
      "Narcis Bujor",
      "Mattia Carnessali",
      "Liviu Trif",
      "Sorin Encică",
    ],
  },
  cupluri: {
    total: 10, // 5 couples = 10 individuals
    participants: [
      "Francesca Sarao",
      "Cristi Pungă",
      "Maria Avram",
      "Marius Avram",
      "Bianca Dan",
      "Marian Grozavu",
      "Isabel Martinez Villa",
      "Claudiu Borca",
      "Ella Vișan",
      "Andrei Lemnaru",
    ],
  },
};

function verifyCategory(categoryName, ourData, expectedData) {
  console.log(`📋 ${categoryName.toUpperCase()}:`);
  console.log(`   Expected: ${expectedData.total} participants`);
  console.log(`   Found: ${ourData.length} participants`);

  if (ourData.length !== expectedData.total) {
    console.log(`   ⚠️  COUNT MISMATCH!`);
  } else {
    console.log(`   ✅ Count matches`);
  }

  // Check if all expected participants are present
  const ourNames = ourData.map((p) => p.name);
  const missing = expectedData.participants.filter(
    (name) => !ourNames.includes(name)
  );
  const extra = ourNames.filter(
    (name) => !expectedData.participants.includes(name)
  );

  if (missing.length > 0) {
    console.log(`   ❌ Missing participants: ${missing.join(", ")}`);
  }

  if (extra.length > 0) {
    console.log(`   ❌ Extra participants: ${extra.join(", ")}`);
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log(`   ✅ All participants present`);
  }

  console.log("");
}

// Run verification
verifyCategory(
  "Ispite Feminine",
  ispiteFeminine,
  verificationChecklist.ispiteFeminine
);
verifyCategory(
  "Ispite Masculine",
  ispiteMasculine,
  verificationChecklist.ispiteMasculine
);
verifyCategory("Cupluri", cupluri, verificationChecklist.cupluri);

// Data quality check
console.log("📊 DATA QUALITY CHECK:\n");

function checkDataQuality(data, categoryName) {
  const withAge = data.filter((p) => p.age !== null).length;
  const withBirthplace = data.filter((p) => p.birthplace !== null).length;
  const withCurrentLocation = data.filter(
    (p) => p.currentLocation !== null
  ).length;
  const withBio = data.filter((p) => p.bio && p.bio.length > 10).length;
  const withOccupation = data.filter(
    (p) => p.occupation && p.occupation !== "TBD"
  ).length;

  console.log(`${categoryName}:`);
  console.log(
    `   Age: ${withAge}/${data.length} (${Math.round(
      (withAge / data.length) * 100
    )}%)`
  );
  console.log(
    `   Birthplace: ${withBirthplace}/${data.length} (${Math.round(
      (withBirthplace / data.length) * 100
    )}%)`
  );
  console.log(
    `   Current Location: ${withCurrentLocation}/${data.length} (${Math.round(
      (withCurrentLocation / data.length) * 100
    )}%)`
  );
  console.log(
    `   Bio: ${withBio}/${data.length} (${Math.round(
      (withBio / data.length) * 100
    )}%)`
  );
  console.log(
    `   Occupation: ${withOccupation}/${data.length} (${Math.round(
      (withOccupation / data.length) * 100
    )}%)`
  );
  console.log("");
}

checkDataQuality(ispiteFeminine, "Ispite Feminine");
checkDataQuality(ispiteMasculine, "Ispite Masculine");
checkDataQuality(cupluri, "Cupluri");

console.log("✨ Data verification completed!");
