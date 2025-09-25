import React from 'react';
import { Weapon, DamageType } from '../types';

interface WeaponSelectorProps {
  weapons: Weapon[];
  selectedWeapon: Weapon | null;
  onWeaponSelect: (weapon: Weapon) => void;
}

const WeaponSelector: React.FC<WeaponSelectorProps> = ({
  weapons,
  selectedWeapon,
  onWeaponSelect,
}) => {
  const getDamageTypeColor = (damageType: DamageType): string => {
    switch (damageType) {
      case DamageType.KINETIC:
        return '#808080';
      case DamageType.INCENDIARY:
        return '#FF6B35';
      case DamageType.SHOCK:
        return '#00BFFF';
      case DamageType.CORROSIVE:
        return '#32CD32';
      case DamageType.CRYO:
        return '#87CEEB';
      case DamageType.RADIATION:
        return '#9ACD32';
      default:
        return '#808080';
    }
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return '#FFFFFF';
      case 'uncommon':
        return '#32CD32';
      case 'rare':
        return '#0066FF';
      case 'epic':
        return '#9932CC';
      case 'legendary':
        return '#FF8C00';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <div className="weapon-selector">
      <h3>Select Weapon</h3>
      <div className="weapon-grid">
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className={`weapon-card ${selectedWeapon?.id === weapon.id ? 'selected' : ''}`}
            onClick={() => onWeaponSelect(weapon)}
            style={{
              borderColor: selectedWeapon?.id === weapon.id ? '#007ACC' : '#ccc',
              borderWidth: selectedWeapon?.id === weapon.id ? '3px' : '1px',
            }}
          >
            <div className="weapon-header">
              <h4 
                className="weapon-name"
                style={{ color: getRarityColor(weapon.rarity) }}
              >
                {weapon.name}
              </h4>
              <span className="weapon-level">Lvl {weapon.level}</span>
            </div>
            
            <div className="weapon-details">
              <div className="weapon-info-row">
                <span className="label">Type:</span>
                <span>{weapon.stats.weaponType}</span>
              </div>
              
              <div className="weapon-info-row">
                <span className="label">Manufacturer:</span>
                <span>{weapon.manufacturer}</span>
              </div>
              
              <div className="weapon-info-row">
                <span className="label">Damage:</span>
                <span className="damage-value">
                  <span 
                    className="damage-type"
                    style={{ color: getDamageTypeColor(weapon.stats.damageType) }}
                  >
                    ●
                  </span>
                  {weapon.stats.baseDamage.toLocaleString()}
                </span>
              </div>
              
              <div className="weapon-info-row">
                <span className="label">Fire Rate:</span>
                <span>{weapon.stats.fireRate}/s</span>
              </div>
              
              <div className="weapon-info-row">
                <span className="label">Critical:</span>
                <span>{weapon.stats.criticalMultiplier}x</span>
              </div>
              
              {weapon.stats.pelletCount && (
                <div className="weapon-info-row">
                  <span className="label">Pellets:</span>
                  <span>{weapon.stats.pelletCount}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponSelector;