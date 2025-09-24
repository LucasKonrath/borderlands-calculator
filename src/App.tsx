import React, { useState, useEffect } from 'react';
import './App.css';
import WeaponSelector from './components/WeaponSelector';
import GameSettings from './components/GameSettings';
import DamageResults from './components/DamageResults';
import AdditionalModifiers from './components/AdditionalModifiers';
import { 
  Weapon, 
  Difficulty, 
  EnemyType, 
  DamageCalculationInput, 
  DamageCalculationResult 
} from './types';
import { SAMPLE_WEAPONS } from './data/constants';
import { calculateDamage } from './utils/damageCalculator';

function App() {
  // State management
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.NORMAL);
  const [enemyType, setEnemyType] = useState<EnemyType>(EnemyType.FLESH);
  const [playerLevel, setPlayerLevel] = useState<number>(50);
  const [enemyLevel, setEnemyLevel] = useState<number>(50);
  const [isCriticalHit, setIsCriticalHit] = useState<boolean>(false);
  
  // Additional modifiers
  const [weaponDamageBonus, setWeaponDamageBonus] = useState<number>(0);
  const [elementalDamageBonus, setElementalDamageBonus] = useState<number>(0);
  const [criticalDamageBonus, setCriticalDamageBonus] = useState<number>(0);
  
  // Results
  const [damageResults, setDamageResults] = useState<DamageCalculationResult | null>(null);

  // Calculate damage whenever inputs change
  useEffect(() => {
    if (!selectedWeapon) {
      setDamageResults(null);
      return;
    }

    const input: DamageCalculationInput = {
      weapon: selectedWeapon,
      difficulty,
      enemyType,
      isCriticalHit,
      playerLevel,
      enemyLevel,
      additionalModifiers: {
        weaponDamageBonus,
        elementalDamageBonus,
        criticalDamageBonus,
      },
    };

    const results = calculateDamage(input);
    setDamageResults(results);
  }, [
    selectedWeapon,
    difficulty,
    enemyType,
    isCriticalHit,
    playerLevel,
    enemyLevel,
    weaponDamageBonus,
    elementalDamageBonus,
    criticalDamageBonus,
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Borderlands 4 Damage Calculator</h1>
        <p>Calculate weapon damage across different difficulties and enemy types</p>
      </header>

      <main className="App-main">
        <div className="calculator-container">
          {/* Left Column - Weapon Selection */}
          <div className="left-column">
            <WeaponSelector
              weapons={SAMPLE_WEAPONS}
              selectedWeapon={selectedWeapon}
              onWeaponSelect={setSelectedWeapon}
            />
          </div>

          {/* Middle Column - Settings */}
          <div className="middle-column">
            <GameSettings
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              enemyType={enemyType}
              onEnemyTypeChange={setEnemyType}
              playerLevel={playerLevel}
              onPlayerLevelChange={setPlayerLevel}
              enemyLevel={enemyLevel}
              onEnemyLevelChange={setEnemyLevel}
              isCriticalHit={isCriticalHit}
              onCriticalHitChange={setIsCriticalHit}
            />

            <AdditionalModifiers
              weaponDamageBonus={weaponDamageBonus}
              elementalDamageBonus={elementalDamageBonus}
              criticalDamageBonus={criticalDamageBonus}
              onWeaponDamageChange={setWeaponDamageBonus}
              onElementalDamageChange={setElementalDamageBonus}
              onCriticalDamageChange={setCriticalDamageBonus}
            />
          </div>

          {/* Right Column - Results */}
          <div className="right-column">
            <DamageResults
              results={damageResults}
              weaponName={selectedWeapon?.name}
            />
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>
          Built with React & TypeScript | Borderlands 4 Damage Mechanics
        </p>
      </footer>
    </div>
  );
}

export default App;
