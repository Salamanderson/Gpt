// Symbol Database for Map Generator
// Based on RPG Map conventions with Layer System support

export type LayerType = 'background' | 'entity';

export interface Symbol {
  emoji: string;
  name: string;
  description: string;
  layer: LayerType;
}

export interface SymbolCategory {
  name: string;
  symbols: Symbol[];
}

// BACKGROUND LAYER: Static elements (terrain, structures, vegetation)
// ENTITY LAYER: Dynamic elements (player, enemies, NPCs, items)

export const SYMBOL_DATABASE: SymbolCategory[] = [
  // ═══════════════════════════════════════════════════════════════
  // TERRAIN (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Terrain",
    symbols: [
      { emoji: "⬛", name: "Void/Wand", description: "Leerer Raum / Wand", layer: "background" },
      { emoji: "⬜", name: "Boden", description: "Begehbarer Boden", layer: "background" },
      { emoji: "🟫", name: "Erde", description: "Erd-/Lehmboden", layer: "background" },
      { emoji: "🟩", name: "Gras", description: "Grasfläche", layer: "background" },
      { emoji: "🟦", name: "Wasser", description: "Tiefes Wasser", layer: "background" },
      { emoji: "🟪", name: "Gift", description: "Giftiger Boden", layer: "background" },
      { emoji: "🟧", name: "Lava", description: "Lava/Feuer-Terrain", layer: "background" },
      { emoji: "🟨", name: "Sand", description: "Sandboden/Wüste", layer: "background" },
      { emoji: "🔳", name: "Schachbrett", description: "Spezieller Boden", layer: "background" },
      { emoji: "🔲", name: "Markierung", description: "Markierter Bereich", layer: "background" },
      { emoji: "💧", name: "Seicht", description: "Seichtes Wasser", layer: "background" },
      { emoji: "🌊", name: "Welle", description: "Bewegtes Wasser", layer: "background" },
      { emoji: "❄️", name: "Eis", description: "Eisfläche/Schnee", layer: "background" },
      { emoji: "🌫️", name: "Nebel", description: "Nebel/Dunst", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // VEGETATION (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Vegetation",
    symbols: [
      { emoji: "🌲", name: "Nadelbaum", description: "Tannenbaum/Nadelwald", layer: "background" },
      { emoji: "🌳", name: "Laubbaum", description: "Laubbaum/Wald", layer: "background" },
      { emoji: "🌴", name: "Palme", description: "Palme/Tropen", layer: "background" },
      { emoji: "🌵", name: "Kaktus", description: "Kaktus/Wüste", layer: "background" },
      { emoji: "🌿", name: "Farn", description: "Farn/Unterholz", layer: "background" },
      { emoji: "🍀", name: "Klee", description: "Glücksklee", layer: "background" },
      { emoji: "🌾", name: "Weizen", description: "Getreide/Feld", layer: "background" },
      { emoji: "🌻", name: "Sonnenblume", description: "Blume", layer: "background" },
      { emoji: "🌹", name: "Rose", description: "Rose/Garten", layer: "background" },
      { emoji: "🍄", name: "Pilz", description: "Pilz", layer: "background" },
      { emoji: "🪨", name: "Felsen", description: "Felsen/Stein", layer: "background" },
      { emoji: "🪵", name: "Holz", description: "Baumstamm/Holz", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // STRUCTURES (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Strukturen",
    symbols: [
      { emoji: "🧱", name: "Ziegel", description: "Ziegelmauer", layer: "background" },
      { emoji: "🪨", name: "Steinmauer", description: "Steinmauer", layer: "background" },
      { emoji: "🚪", name: "Tür", description: "Tür/Eingang", layer: "background" },
      { emoji: "🪟", name: "Fenster", description: "Fenster", layer: "background" },
      { emoji: "🏠", name: "Haus", description: "Gebäude/Haus", layer: "background" },
      { emoji: "🏰", name: "Burg", description: "Burg/Schloss", layer: "background" },
      { emoji: "🏛️", name: "Tempel", description: "Tempel/Säulen", layer: "background" },
      { emoji: "⛪", name: "Kirche", description: "Kirche/Kapelle", layer: "background" },
      { emoji: "🏚️", name: "Ruine", description: "Verfallenes Gebäude", layer: "background" },
      { emoji: "🏕️", name: "Zelt", description: "Zelt/Lager", layer: "background" },
      { emoji: "🌉", name: "Brücke", description: "Brücke", layer: "background" },
      { emoji: "⛩️", name: "Tor", description: "Tor/Portal", layer: "background" },
      { emoji: "🗼", name: "Turm", description: "Turm", layer: "background" },
      { emoji: "⚓", name: "Hafen", description: "Hafen/Anker", layer: "background" },
      { emoji: "🪜", name: "Leiter", description: "Leiter/Treppe", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // FURNITURE & OBJECTS (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Möbel & Objekte",
    symbols: [
      { emoji: "🪑", name: "Stuhl", description: "Stuhl/Sitz", layer: "background" },
      { emoji: "🛏️", name: "Bett", description: "Bett", layer: "background" },
      { emoji: "🛋️", name: "Sofa", description: "Sofa/Couch", layer: "background" },
      { emoji: "🪞", name: "Spiegel", description: "Spiegel", layer: "background" },
      { emoji: "🖼️", name: "Bild", description: "Bild/Gemälde", layer: "background" },
      { emoji: "🕯️", name: "Kerze", description: "Kerze/Licht", layer: "background" },
      { emoji: "🔥", name: "Feuer", description: "Feuer/Lagerfeuer", layer: "background" },
      { emoji: "⚱️", name: "Vase", description: "Vase/Urne", layer: "background" },
      { emoji: "📚", name: "Bücher", description: "Bücher/Regal", layer: "background" },
      { emoji: "🗃️", name: "Schrank", description: "Schrank/Ablage", layer: "background" },
      { emoji: "⚗️", name: "Alchemie", description: "Alchemie-Set", layer: "background" },
      { emoji: "🔮", name: "Kristall", description: "Kristallkugel", layer: "background" },
      { emoji: "⚔️", name: "Waffen", description: "Waffenständer", layer: "background" },
      { emoji: "🛡️", name: "Schild", description: "Schildhalter", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // INTERACTIVE OBJECTS (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Interaktive Objekte",
    symbols: [
      { emoji: "📦", name: "Kiste", description: "Kiste/Container", layer: "background" },
      { emoji: "🗝️", name: "Schlüssel", description: "Schlüsselposition", layer: "background" },
      { emoji: "🔒", name: "Schloss", description: "Verschlossen", layer: "background" },
      { emoji: "🔓", name: "Offen", description: "Geöffnet", layer: "background" },
      { emoji: "⚙️", name: "Mechanik", description: "Mechanismus", layer: "background" },
      { emoji: "🎚️", name: "Hebel", description: "Hebel/Schalter", layer: "background" },
      { emoji: "🪤", name: "Falle", description: "Falle", layer: "background" },
      { emoji: "💀", name: "Gefahr", description: "Tödliche Gefahr", layer: "background" },
      { emoji: "⚠️", name: "Warnung", description: "Warnung", layer: "background" },
      { emoji: "❓", name: "Geheimnis", description: "Geheimnis/Rätsel", layer: "background" },
      { emoji: "💎", name: "Schatz", description: "Schatz/Juwel", layer: "background" },
      { emoji: "🏆", name: "Trophäe", description: "Belohnung", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION (Background Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Navigation",
    symbols: [
      { emoji: "⬆️", name: "Nord", description: "Richtung Nord", layer: "background" },
      { emoji: "⬇️", name: "Süd", description: "Richtung Süd", layer: "background" },
      { emoji: "⬅️", name: "West", description: "Richtung West", layer: "background" },
      { emoji: "➡️", name: "Ost", description: "Richtung Ost", layer: "background" },
      { emoji: "🔼", name: "Aufgang", description: "Treppe hoch", layer: "background" },
      { emoji: "🔽", name: "Abgang", description: "Treppe runter", layer: "background" },
      { emoji: "🚩", name: "Markierung", description: "Wichtiger Punkt", layer: "background" },
      { emoji: "📍", name: "Position", description: "Exakte Position", layer: "background" },
      { emoji: "🎯", name: "Ziel", description: "Zielposition", layer: "background" },
      { emoji: "🔄", name: "Teleporter", description: "Teleporter/Portal", layer: "background" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // PLAYER & ALLIES (Entity Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Spieler & Verbündete",
    symbols: [
      { emoji: "🧙", name: "Spieler", description: "Spielercharakter", layer: "entity" },
      { emoji: "🧙‍♂️", name: "Magier", description: "Magier (männl.)", layer: "entity" },
      { emoji: "🧙‍♀️", name: "Magierin", description: "Magierin", layer: "entity" },
      { emoji: "🧝", name: "Elf", description: "Elf/Elfe", layer: "entity" },
      { emoji: "🧝‍♂️", name: "Elf (m)", description: "Elf (männl.)", layer: "entity" },
      { emoji: "🧝‍♀️", name: "Elfe (w)", description: "Elfe (weibl.)", layer: "entity" },
      { emoji: "🧑‍🦱", name: "Held", description: "Held/Abenteurer", layer: "entity" },
      { emoji: "👨‍🦰", name: "Krieger", description: "Krieger", layer: "entity" },
      { emoji: "👩‍🦰", name: "Kriegerin", description: "Kriegerin", layer: "entity" },
      { emoji: "🦸", name: "Superheld", description: "Mächtiger Held", layer: "entity" },
      { emoji: "🦸‍♂️", name: "Held (m)", description: "Held (männl.)", layer: "entity" },
      { emoji: "🦸‍♀️", name: "Heldin (w)", description: "Heldin (weibl.)", layer: "entity" },
      { emoji: "🐕", name: "Hund", description: "Begleiter Hund", layer: "entity" },
      { emoji: "🐈", name: "Katze", description: "Begleiter Katze", layer: "entity" },
      { emoji: "🦅", name: "Adler", description: "Begleiter Vogel", layer: "entity" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ENEMIES (Entity Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Feinde",
    symbols: [
      { emoji: "👹", name: "Ork", description: "Ork/Oger", layer: "entity" },
      { emoji: "👺", name: "Dämon", description: "Dämon/Teufel", layer: "entity" },
      { emoji: "👻", name: "Geist", description: "Geist/Gespenst", layer: "entity" },
      { emoji: "💀", name: "Skelett", description: "Skelett", layer: "entity" },
      { emoji: "🧟", name: "Zombie", description: "Zombie", layer: "entity" },
      { emoji: "🧟‍♂️", name: "Zombie (m)", description: "Zombie (männl.)", layer: "entity" },
      { emoji: "🧟‍♀️", name: "Zombie (w)", description: "Zombie (weibl.)", layer: "entity" },
      { emoji: "🧛", name: "Vampir", description: "Vampir", layer: "entity" },
      { emoji: "🧛‍♂️", name: "Vampir (m)", description: "Vampir (männl.)", layer: "entity" },
      { emoji: "🧛‍♀️", name: "Vampirin", description: "Vampir (weibl.)", layer: "entity" },
      { emoji: "🐉", name: "Drache", description: "Drache", layer: "entity" },
      { emoji: "🐍", name: "Schlange", description: "Schlange", layer: "entity" },
      { emoji: "🦇", name: "Fledermaus", description: "Fledermaus", layer: "entity" },
      { emoji: "🕷️", name: "Spinne", description: "Spinne", layer: "entity" },
      { emoji: "🦂", name: "Skorpion", description: "Skorpion", layer: "entity" },
      { emoji: "🐺", name: "Wolf", description: "Wolf", layer: "entity" },
      { emoji: "🐗", name: "Wildschwein", description: "Wildschwein", layer: "entity" },
      { emoji: "🦎", name: "Echse", description: "Echsenmensch", layer: "entity" },
      { emoji: "🐙", name: "Krake", description: "Krake/Tentakel", layer: "entity" },
      { emoji: "🦑", name: "Tintenfisch", description: "Tintenfisch", layer: "entity" },
      { emoji: "👁️", name: "Auge", description: "Beobachter", layer: "entity" },
      { emoji: "🌀", name: "Wirbel", description: "Elementar", layer: "entity" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // NPCs (Entity Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "NPCs",
    symbols: [
      { emoji: "👤", name: "Person", description: "Unbekannte Person", layer: "entity" },
      { emoji: "👥", name: "Gruppe", description: "Menschengruppe", layer: "entity" },
      { emoji: "🧓", name: "Ältester", description: "Weiser Alter", layer: "entity" },
      { emoji: "👴", name: "Alter Mann", description: "Alter Mann", layer: "entity" },
      { emoji: "👵", name: "Alte Frau", description: "Alte Frau", layer: "entity" },
      { emoji: "🤴", name: "Prinz", description: "Prinz/König", layer: "entity" },
      { emoji: "👸", name: "Prinzessin", description: "Prinzessin/Königin", layer: "entity" },
      { emoji: "💂", name: "Wache", description: "Wache/Soldat", layer: "entity" },
      { emoji: "💂‍♂️", name: "Wache (m)", description: "Wache (männl.)", layer: "entity" },
      { emoji: "💂‍♀️", name: "Wache (w)", description: "Wache (weibl.)", layer: "entity" },
      { emoji: "🧑‍🌾", name: "Bauer", description: "Bauer/Landwirt", layer: "entity" },
      { emoji: "🧑‍🔧", name: "Schmied", description: "Handwerker", layer: "entity" },
      { emoji: "🧑‍🍳", name: "Koch", description: "Koch/Wirt", layer: "entity" },
      { emoji: "🧑‍⚕️", name: "Heiler", description: "Heiler/Arzt", layer: "entity" },
      { emoji: "🧑‍🏫", name: "Gelehrter", description: "Lehrer/Gelehrter", layer: "entity" },
      { emoji: "🧑‍💼", name: "Händler", description: "Händler/Kaufmann", layer: "entity" },
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ITEMS (Entity Layer)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Items",
    symbols: [
      { emoji: "🗡️", name: "Schwert", description: "Schwert", layer: "entity" },
      { emoji: "🪓", name: "Axt", description: "Axt", layer: "entity" },
      { emoji: "🏹", name: "Bogen", description: "Bogen & Pfeil", layer: "entity" },
      { emoji: "🪄", name: "Zauberstab", description: "Zauberstab", layer: "entity" },
      { emoji: "📜", name: "Schriftrolle", description: "Schriftrolle", layer: "entity" },
      { emoji: "📖", name: "Buch", description: "Zauberbuch", layer: "entity" },
      { emoji: "🧪", name: "Trank", description: "Trank/Elixier", layer: "entity" },
      { emoji: "💰", name: "Gold", description: "Goldmünzen", layer: "entity" },
      { emoji: "💍", name: "Ring", description: "Magischer Ring", layer: "entity" },
      { emoji: "📿", name: "Amulett", description: "Amulett/Kette", layer: "entity" },
      { emoji: "👑", name: "Krone", description: "Krone", layer: "entity" },
      { emoji: "🎒", name: "Rucksack", description: "Rucksack/Tasche", layer: "entity" },
      { emoji: "🗺️", name: "Karte", description: "Schatzkarte", layer: "entity" },
      { emoji: "🔑", name: "Schlüssel", description: "Schlüssel", layer: "entity" },
      { emoji: "🍖", name: "Fleisch", description: "Nahrung", layer: "entity" },
      { emoji: "🍞", name: "Brot", description: "Brot", layer: "entity" },
      { emoji: "🍎", name: "Apfel", description: "Apfel", layer: "entity" },
      { emoji: "🧀", name: "Käse", description: "Käse", layer: "entity" },
    ]
  },
];

// Get all valid emojis as a flat list
export const getAllValidEmojis = (): string[] => {
  return SYMBOL_DATABASE.flatMap(category => category.symbols.map(s => s.emoji));
};

// Get symbol info by emoji
export const getSymbolInfo = (emoji: string): Symbol | undefined => {
  for (const category of SYMBOL_DATABASE) {
    const symbol = category.symbols.find(s => s.emoji === emoji);
    if (symbol) return symbol;
  }
  return undefined;
};

// Check if emoji is valid
export const isValidEmoji = (emoji: string): boolean => {
  return getAllValidEmojis().includes(emoji);
};

// Get background layer symbols
export const getBackgroundSymbols = (): Symbol[] => {
  return SYMBOL_DATABASE.flatMap(category =>
    category.symbols.filter(s => s.layer === 'background')
  );
};

// Get entity layer symbols
export const getEntitySymbols = (): Symbol[] => {
  return SYMBOL_DATABASE.flatMap(category =>
    category.symbols.filter(s => s.layer === 'entity')
  );
};

// Default empty cell
export const EMPTY_CELL = "⬜";
