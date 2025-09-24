import React from 'react';
import { Difficulty, EnemyType } from '../types';

interface GameSettingsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  enemyType: EnemyType;
  onEnemyTypeChange: (enemyType: EnemyType) => void;
  playerLevel: number;
  onPlayerLevelChange: (level: number) => void;
  enemyLevel: number;
  onEnemyLevelChange: (level: number) => void;
  isCriticalHit: boolean;
  onCriticalHitChange: (isCritical: boolean) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  difficulty,
  onDifficultyChange,
  enemyType,
  onEnemyTypeChange,
  playerLevel,
  onPlayerLevelChange,
  enemyLevel,
  onEnemyLevelChange,
  isCriticalHit,
  onCriticalHitChange,
}) => {
  const getEnemyTypeColor = (type: EnemyType): string => {
    switch (type) {
      case EnemyType.FLESH:
        return '#FF6B6B';
      case EnemyType.ARMOR:
        return '#8B4513';
      case EnemyType.SHIELD:
        return '#00BFFF';
      case EnemyType.ROBOT:
        return '#C0C0C0';
      case EnemyType.FROZEN:
        return '#87CEEB';
      default:
        return '#808080';
    }
  };

  const getDifficultyColor = (diff: Difficulty): string => {
    if (diff.includes('MAYHEM')) {
      const mayhemLevel = parseInt(diff.split('_')[1]) || 1;
      const intensity = mayhemLevel / 10;
      return `hsl(${360 - (intensity * 60)}, 100%, ${50 + (intensity * 25)}%)`;
    }
    
    switch (diff) {
      case Difficulty.NORMAL:
        return '#32CD32';
      case Difficulty.TRUE_VAULT_HUNTER:
        return '#FFD700';
      case Difficulty.ULTIMATE_VAULT_HUNTER:
        return '#FF6347';
      default:
        return '#808080';
    }
  };

  return (
    <div className="game-settings">
      <h3>Game Settings</h3>
      
      <div className="settings-grid">
        {/* Difficulty Selection */}
        <div className="setting-group">
          <label>Difficulty Mode</label>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className="setting-select"
            style={{ 
              borderLeft: `4px solid ${getDifficultyColor(difficulty)}`,
            }}
          >
            {Object.values(Difficulty).map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Enemy Type Selection */}
        <div className="setting-group">
          <label>Enemy Type</label>
          <select
            value={enemyType}
            onChange={(e) => onEnemyTypeChange(e.target.value as EnemyType)}
            className="setting-select"
            style={{ 
              borderLeft: `4px solid ${getEnemyTypeColor(enemyType)}`,
            }}
          >
            {Object.values(EnemyType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Player Level */}
        <div className="setting-group">
          <label>Player Level</label>
          <input
            type="number"
            min="1"
            max="72"
            value={playerLevel}
            onChange={(e) => onPlayerLevelChange(parseInt(e.target.value))}
            className="setting-input"
          />
        </div>

        {/* Enemy Level */}
        <div className="setting-group">
          <label>Enemy Level</label>
          <input
            type="number"
            min="1"
            max="80"
            value={enemyLevel}
            onChange={(e) => onEnemyLevelChange(parseInt(e.target.value))}
            className="setting-input"
          />
        </div>

        {/* Critical Hit Toggle */}
        <div className="setting-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isCriticalHit}
              onChange={(e) => onCriticalHitChange(e.target.checked)}
              className="setting-checkbox"
            />
            <span className="checkmark"></span>
            Critical Hit
          </label>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;