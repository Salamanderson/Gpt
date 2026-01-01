import { useState, useCallback, useMemo } from 'react';
import { SYMBOL_DATABASE, EMPTY_CELL, getSymbolInfo } from './data/symbols';
import type { Cell, GridState, ActiveLayer } from './types';

// Initialize empty grid
const createEmptyGrid = (width: number, height: number): Cell[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      background: EMPTY_CELL,
      entity: null,
    }))
  );
};

function App() {
  // Grid configuration
  const [gridWidth, setGridWidth] = useState(12);
  const [gridHeight, setGridHeight] = useState(10);

  // Grid state
  const [grid, setGrid] = useState<GridState>({
    width: gridWidth,
    height: gridHeight,
    cells: createEmptyGrid(gridWidth, gridHeight),
  });

  // Editor state
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('background');
  const [isPainting, setIsPainting] = useState(false);
  const [showEntities, setShowEntities] = useState(true);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Apply grid size changes
  const applyGridSize = useCallback(() => {
    const newCells = createEmptyGrid(gridWidth, gridHeight);
    // Copy existing cells where possible
    for (let y = 0; y < Math.min(gridHeight, grid.cells.length); y++) {
      for (let x = 0; x < Math.min(gridWidth, grid.cells[y]?.length || 0); x++) {
        newCells[y][x] = { ...grid.cells[y][x] };
      }
    }
    setGrid({
      width: gridWidth,
      height: gridHeight,
      cells: newCells,
    });
  }, [gridWidth, gridHeight, grid.cells]);

  // Handle cell click/paint
  const handleCellInteraction = useCallback((x: number, y: number) => {
    if (!selectedEmoji) return;

    setGrid(prev => {
      const newCells = prev.cells.map(row => row.map(cell => ({ ...cell })));
      const symbolInfo = getSymbolInfo(selectedEmoji);

      if (symbolInfo) {
        if (symbolInfo.layer === 'entity') {
          // Toggle entity on cell
          if (newCells[y][x].entity === selectedEmoji) {
            newCells[y][x].entity = null;
          } else {
            newCells[y][x].entity = selectedEmoji;
          }
        } else {
          // Set background
          newCells[y][x].background = selectedEmoji;
        }
      }

      return { ...prev, cells: newCells };
    });
  }, [selectedEmoji]);

  // Clear grid
  const clearGrid = useCallback(() => {
    setGrid({
      width: grid.width,
      height: grid.height,
      cells: createEmptyGrid(grid.width, grid.height),
    });
  }, [grid.width, grid.height]);

  // Clear only entities
  const clearEntities = useCallback(() => {
    setGrid(prev => ({
      ...prev,
      cells: prev.cells.map(row =>
        row.map(cell => ({ ...cell, entity: null }))
      ),
    }));
  }, []);

  // Get used symbols for legend
  const usedSymbols = useMemo(() => {
    const used = new Set<string>();
    for (const row of grid.cells) {
      for (const cell of row) {
        if (cell.background !== EMPTY_CELL) used.add(cell.background);
        if (cell.entity) used.add(cell.entity);
      }
    }
    return Array.from(used);
  }, [grid.cells]);

  // Generate export string
  const generateExport = useCallback(() => {
    // Generate main map (with entities on top of background)
    const mapLines = grid.cells.map(row =>
      row.map(cell => cell.entity || cell.background).join('')
    );
    const mapString = '```\n' + mapLines.join('\n') + '\n```';

    // Generate legend
    const legendLines = usedSymbols.map(emoji => {
      const info = getSymbolInfo(emoji);
      return `${emoji} = ${info?.name || 'Unbekannt'} (${info?.description || ''})`;
    });
    const legendString = legendLines.length > 0
      ? '**LEGENDE:**\n' + legendLines.join('\n')
      : '';

    // Generate location template (only background, no entities)
    const templateLines = grid.cells.map(row =>
      row.map(cell => cell.background).join('')
    );
    const templateString = '**LOCATION-TEMPLATE:**\n```\n' + templateLines.join('\n') + '\n```';

    return `${mapString}\n\n${legendString}\n\n${templateString}`;
  }, [grid.cells, usedSymbols]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    const exportString = generateExport();
    try {
      await navigator.clipboard.writeText(exportString);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [generateExport]);

  // Filter categories based on active layer
  const filteredCategories = useMemo(() => {
    return SYMBOL_DATABASE.map(category => ({
      ...category,
      symbols: category.symbols.filter(s =>
        activeLayer === 'background' ? s.layer === 'background' : s.layer === 'entity'
      ),
    })).filter(category => category.symbols.length > 0);
  }, [activeLayer]);

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            🗺️ Map Generator
          </h1>
        </div>

        {/* Layer Toggle */}
        <div className="p-4 border-b border-slate-700">
          <label className="text-sm text-slate-400 mb-2 block">Aktiver Layer</label>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveLayer('background')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                activeLayer === 'background'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🏔️ Hintergrund
            </button>
            <button
              onClick={() => setActiveLayer('entity')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                activeLayer === 'entity'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              👤 Entities
            </button>
          </div>
        </div>

        {/* Symbol Palette */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredCategories.map(category => (
            <div key={category.name} className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-6 gap-1">
                {category.symbols.map(symbol => (
                  <button
                    key={symbol.emoji}
                    onClick={() => setSelectedEmoji(symbol.emoji)}
                    title={`${symbol.name}: ${symbol.description}`}
                    className={`w-9 h-9 flex items-center justify-center text-lg rounded transition-all ${
                      selectedEmoji === symbol.emoji
                        ? 'bg-blue-500 ring-2 ring-blue-400 scale-110'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {symbol.emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Emoji Info */}
        {selectedEmoji && (
          <div className="p-4 border-t border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedEmoji}</span>
              <div>
                <p className="text-white font-medium">
                  {getSymbolInfo(selectedEmoji)?.name}
                </p>
                <p className="text-sm text-slate-400">
                  {getSymbolInfo(selectedEmoji)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center gap-4 flex-wrap">
          {/* Grid Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Breite:</label>
            <input
              type="number"
              min="3"
              max="30"
              value={gridWidth}
              onChange={(e) => setGridWidth(Math.max(3, Math.min(30, parseInt(e.target.value) || 12)))}
              className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Höhe:</label>
            <input
              type="number"
              min="3"
              max="30"
              value={gridHeight}
              onChange={(e) => setGridHeight(Math.max(3, Math.min(30, parseInt(e.target.value) || 10)))}
              className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
            />
          </div>
          <button
            onClick={applyGridSize}
            className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
          >
            Anwenden
          </button>

          <div className="w-px h-6 bg-slate-600" />

          {/* View Toggle */}
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showEntities}
              onChange={(e) => setShowEntities(e.target.checked)}
              className="rounded"
            />
            Entities anzeigen
          </label>

          <div className="w-px h-6 bg-slate-600" />

          {/* Actions */}
          <button
            onClick={clearEntities}
            className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
          >
            Entities löschen
          </button>
          <button
            onClick={clearGrid}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition-colors"
          >
            Alles löschen
          </button>

          <div className="flex-1" />

          {/* Export Button */}
          <button
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded font-medium text-sm transition-all ${
              exportSuccess
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {exportSuccess ? '✓ Kopiert!' : '📋 In Zwischenablage kopieren'}
          </button>
        </div>

        {/* Grid Canvas */}
        <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
          <div
            className="inline-grid gap-0 bg-slate-950 p-1 rounded-lg shadow-xl"
            style={{
              gridTemplateColumns: `repeat(${grid.width}, 1fr)`,
            }}
            onMouseLeave={() => setIsPainting(false)}
          >
            {grid.cells.map((row, y) =>
              row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  onMouseDown={() => {
                    setIsPainting(true);
                    handleCellInteraction(x, y);
                  }}
                  onMouseUp={() => setIsPainting(false)}
                  onMouseEnter={() => {
                    if (isPainting) handleCellInteraction(x, y);
                  }}
                  className="w-10 h-10 flex items-center justify-center text-xl border border-slate-800 hover:border-blue-500 transition-colors relative select-none"
                  style={{
                    backgroundColor: cell.background === EMPTY_CELL ? '#1e293b' : 'transparent',
                  }}
                >
                  {/* Background */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    {cell.background}
                  </span>
                  {/* Entity */}
                  {showEntities && cell.entity && (
                    <span className="absolute inset-0 flex items-center justify-center z-10">
                      {cell.entity}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 flex items-center gap-4 text-sm text-slate-400">
          <span>Raster: {grid.width} × {grid.height}</span>
          <span>|</span>
          <span>Symbole verwendet: {usedSymbols.length}</span>
          <span>|</span>
          <span className={activeLayer === 'background' ? 'text-blue-400' : 'text-purple-400'}>
            Layer: {activeLayer === 'background' ? 'Hintergrund' : 'Entities'}
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
