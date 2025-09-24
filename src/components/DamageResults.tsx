import React from 'react';
import { DamageCalculationResult } from '../types';
import { formatDamage, getEffectivenessDescription } from '../utils/damageCalculator';

interface DamageResultsProps {
  results: DamageCalculationResult | null;
  weaponName?: string;
}

const DamageResults: React.FC<DamageResultsProps> = ({ results, weaponName }) => {
  if (!results) {
    return (
      <div className="damage-results">
        <h3>Damage Results</h3>
        <p className="no-results">Select a weapon and configure settings to see damage calculations.</p>
      </div>
    );
  }

  const getEffectivenessColor = (multiplier: number): string => {
    if (multiplier >= 2.0) return '#00FF00';
    if (multiplier >= 1.5) return '#90EE90';
    if (multiplier > 1.0) return '#ADFF2F';
    if (multiplier === 1.0) return '#FFFFFF';
    if (multiplier >= 0.65) return '#FFA500';
    return '#FF4500';
  };

  return (
    <div className="damage-results">
      <h3>Damage Results {weaponName && `- ${weaponName}`}</h3>
      
      {/* Main damage display */}
      <div className="main-damage">
        <div className="damage-value-large">
          <span className="damage-number">{formatDamage(results.finalDamage)}</span>
          <span className="damage-label">Damage per Hit</span>
        </div>
        
        <div className="dps-value">
          <span className="dps-number">{formatDamage(results.dps)}</span>
          <span className="dps-label">DPS</span>
        </div>
      </div>

      {/* Elemental effectiveness */}
      <div className="elemental-effectiveness">
        <h4>Elemental Effectiveness</h4>
        <div className="effectiveness-display">
          <span 
            className="effectiveness-multiplier"
            style={{ color: getEffectivenessColor(results.elementalEffectiveness) }}
          >
            {results.elementalEffectiveness.toFixed(2)}x
          </span>
          <span className="effectiveness-description">
            {getEffectivenessDescription(results.elementalEffectiveness)}
          </span>
        </div>
      </div>

      {/* Damage breakdown */}
      <div className="damage-breakdown">
        <h4>Damage Breakdown</h4>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="breakdown-label">Base Damage:</span>
            <span className="breakdown-value">{formatDamage(results.baseDamage)}</span>
          </div>
          
          <div className="breakdown-item">
            <span className="breakdown-label">Scaled Damage:</span>
            <span className="breakdown-value">{formatDamage(results.scaledDamage)}</span>
          </div>
          
          <div className="breakdown-item">
            <span className="breakdown-label">Level Scaling:</span>
            <span className="breakdown-multiplier">{results.breakdown.levelScaling.toFixed(2)}x</span>
          </div>
          
          <div className="breakdown-item">
            <span className="breakdown-label">Difficulty Modifier:</span>
            <span className="breakdown-multiplier">{results.breakdown.difficultyModifier.toFixed(2)}x</span>
          </div>
          
          <div className="breakdown-item">
            <span className="breakdown-label">Elemental Modifier:</span>
            <span 
              className="breakdown-multiplier"
              style={{ color: getEffectivenessColor(results.breakdown.elementalModifier) }}
            >
              {results.breakdown.elementalModifier.toFixed(2)}x
            </span>
          </div>
          
          <div className="breakdown-item">
            <span className="breakdown-label">Critical Modifier:</span>
            <span className="breakdown-multiplier">
              {results.breakdown.criticalModifier.toFixed(2)}x
              {results.breakdown.criticalModifier > 1.0 && (
                <span className="critical-indicator"> 💥</span>
              )}
            </span>
          </div>
          
          {results.breakdown.additionalModifiers > 1.0 && (
            <div className="breakdown-item">
              <span className="breakdown-label">Additional Modifiers:</span>
              <span className="breakdown-multiplier">{results.breakdown.additionalModifiers.toFixed(2)}x</span>
            </div>
          )}
        </div>
      </div>

      {/* Critical hit display */}
      {results.criticalDamage > 0 && (
        <div className="critical-hit-display">
          <h4>Critical Hit 💥</h4>
          <div className="critical-damage">
            <span className="critical-number">{formatDamage(results.criticalDamage)}</span>
            <span className="critical-label">Critical Damage</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageResults;