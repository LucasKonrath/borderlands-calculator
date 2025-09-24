import React from 'react';

interface AdditionalModifiersProps {
  weaponDamageBonus: number;
  elementalDamageBonus: number;
  criticalDamageBonus: number;
  onWeaponDamageChange: (value: number) => void;
  onElementalDamageChange: (value: number) => void;
  onCriticalDamageChange: (value: number) => void;
}

const AdditionalModifiers: React.FC<AdditionalModifiersProps> = ({
  weaponDamageBonus,
  elementalDamageBonus,
  criticalDamageBonus,
  onWeaponDamageChange,
  onElementalDamageChange,
  onCriticalDamageChange,
}) => {
  return (
    <div className="additional-modifiers">
      <h3>Additional Damage Modifiers</h3>
      <p className="modifiers-description">
        Add any additional damage bonuses from skills, class mods, artifacts, or other sources.
      </p>
      
      <div className="modifiers-grid">
        <div className="modifier-group">
          <label htmlFor="weapon-damage">Weapon Damage Bonus (%)</label>
          <div className="input-group">
            <input
              id="weapon-damage"
              type="number"
              min="0"
              max="1000"
              step="1"
              value={weaponDamageBonus}
              onChange={(e) => onWeaponDamageChange(parseFloat(e.target.value) || 0)}
              className="modifier-input"
            />
            <span className="input-suffix">%</span>
          </div>
          <small className="modifier-help">
            Includes gun damage, weapon type damage, and manufacturer bonuses
          </small>
        </div>

        <div className="modifier-group">
          <label htmlFor="elemental-damage">Elemental Damage Bonus (%)</label>
          <div className="input-group">
            <input
              id="elemental-damage"
              type="number"
              min="0"
              max="1000"
              step="1"
              value={elementalDamageBonus}
              onChange={(e) => onElementalDamageChange(parseFloat(e.target.value) || 0)}
              className="modifier-input"
            />
            <span className="input-suffix">%</span>
          </div>
          <small className="modifier-help">
            Includes elemental damage bonuses and element-specific bonuses
          </small>
        </div>

        <div className="modifier-group">
          <label htmlFor="critical-damage">Critical Hit Damage Bonus (%)</label>
          <div className="input-group">
            <input
              id="critical-damage"
              type="number"
              min="0"
              max="1000"
              step="1"
              value={criticalDamageBonus}
              onChange={(e) => onCriticalDamageChange(parseFloat(e.target.value) || 0)}
              className="modifier-input"
            />
            <span className="input-suffix">%</span>
          </div>
          <small className="modifier-help">
            Additional critical hit damage beyond base weapon multiplier
          </small>
        </div>
      </div>

      <div className="modifiers-summary">
        <h4>Total Modifiers</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Weapon Damage:</span>
            <span className="summary-value">+{weaponDamageBonus}%</span>
          </div>
          <div className="summary-item">
            <span>Elemental Damage:</span>
            <span className="summary-value">+{elementalDamageBonus}%</span>
          </div>
          <div className="summary-item">
            <span>Critical Damage:</span>
            <span className="summary-value">+{criticalDamageBonus}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalModifiers;