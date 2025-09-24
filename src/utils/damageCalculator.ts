import {
  DamageCalculationInput,
  DamageCalculationResult,
} from '../types';
import {
  DIFFICULTY_MODIFIERS,
  ELEMENTAL_EFFECTIVENESS,
  LEVEL_SCALING_BASE,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../data/constants';

/**
 * Calculates level scaling factor based on the difference between player and enemy levels
 */
export function calculateLevelScaling(playerLevel: number, enemyLevel: number): number {
  const levelDifference = enemyLevel - playerLevel;
  
  // Clamp levels to valid range
  const clampedPlayerLevel = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, playerLevel));
  const clampedEnemyLevel = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, enemyLevel));
  const clampedDifference = clampedEnemyLevel - clampedPlayerLevel;
  
  // If player is higher level than enemy, damage is increased
  if (clampedDifference <= 0) {
    return Math.min(2.0, Math.pow(LEVEL_SCALING_BASE, Math.abs(clampedDifference)));
  }
  
  // If enemy is higher level than player, damage is reduced
  const scalingFactor = Math.pow(LEVEL_SCALING_BASE, -clampedDifference);
  return Math.max(0.1, scalingFactor); // Minimum 10% damage
}

/**
 * Calculates elemental effectiveness multiplier
 */
export function calculateElementalEffectiveness(
  damageType: string,
  enemyType: string
): number {
  const effectiveness = ELEMENTAL_EFFECTIVENESS[enemyType as keyof typeof ELEMENTAL_EFFECTIVENESS];
  if (!effectiveness) return 1.0;
  
  return effectiveness[damageType as keyof typeof effectiveness] || 1.0;
}

/**
 * Calculates weapon damage scaling based on weapon level
 */
export function calculateWeaponDamageScaling(weaponLevel: number): number {
  const clampedLevel = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, weaponLevel));
  // Base damage scaling for weapon levels
  return Math.pow(1.13, clampedLevel - 1);
}

/**
 * Main damage calculation function
 */
export function calculateDamage(input: DamageCalculationInput): DamageCalculationResult {
  const {
    weapon,
    difficulty,
    enemyType,
    isCriticalHit,
    playerLevel,
    enemyLevel,
    additionalModifiers = {},
  } = input;

  // Get base damage from weapon
  let baseDamage = weapon.stats.baseDamage;
  
  // Apply pellet count for shotguns
  if (weapon.stats.pelletCount) {
    baseDamage *= weapon.stats.pelletCount;
  }

  // Calculate level scaling
  const levelScaling = calculateLevelScaling(playerLevel, enemyLevel);
  
  // Calculate weapon level scaling
  const weaponScaling = calculateWeaponDamageScaling(weapon.level);
  
  // Get difficulty modifier
  const difficultyModifier = DIFFICULTY_MODIFIERS[difficulty]?.damageMultiplier || 1.0;
  
  // Calculate elemental effectiveness
  const elementalModifier = calculateElementalEffectiveness(
    weapon.stats.damageType,
    enemyType
  );
  
  // Calculate critical hit multiplier
  const criticalModifier = isCriticalHit ? weapon.stats.criticalMultiplier : 1.0;
  
  // Apply additional modifiers
  const weaponDamageBonus = 1.0 + (additionalModifiers.weaponDamageBonus || 0) / 100;
  const elementalDamageBonus = 1.0 + (additionalModifiers.elementalDamageBonus || 0) / 100;
  const criticalDamageBonus = isCriticalHit 
    ? 1.0 + (additionalModifiers.criticalDamageBonus || 0) / 100 
    : 1.0;
  
  // Calculate scaled damage (before modifiers)
  const scaledDamage = baseDamage * weaponScaling * levelScaling;
  
  // Calculate final damage with all modifiers
  const finalDamage = scaledDamage *
    difficultyModifier *
    elementalModifier *
    criticalModifier *
    weaponDamageBonus *
    elementalDamageBonus *
    criticalDamageBonus;
  
  // Calculate DPS (Damage Per Second)
  const dps = finalDamage * weapon.stats.fireRate;
  
  // Calculate critical damage (for display purposes)
  const criticalDamage = isCriticalHit ? finalDamage : 0;
  
  return {
    baseDamage,
    scaledDamage,
    elementalEffectiveness: elementalModifier,
    criticalDamage,
    finalDamage: Math.round(finalDamage),
    dps: Math.round(dps),
    breakdown: {
      levelScaling,
      difficultyModifier,
      elementalModifier,
      criticalModifier,
      additionalModifiers: weaponDamageBonus * elementalDamageBonus * criticalDamageBonus,
    },
  };
}

/**
 * Calculates damage comparison across different difficulties
 */
export function calculateDamageComparison(
  input: Omit<DamageCalculationInput, 'difficulty'>
): Record<string, DamageCalculationResult> {
  const difficulties = Object.values(DIFFICULTY_MODIFIERS);
  const results: Record<string, DamageCalculationResult> = {};
  
  Object.keys(DIFFICULTY_MODIFIERS).forEach((difficulty) => {
    results[difficulty] = calculateDamage({
      ...input,
      difficulty: difficulty as any,
    });
  });
  
  return results;
}

/**
 * Utility function to format damage numbers
 */
export function formatDamage(damage: number): string {
  if (damage >= 1000000) {
    return `${(damage / 1000000).toFixed(1)}M`;
  } else if (damage >= 1000) {
    return `${(damage / 1000).toFixed(1)}K`;
  }
  return damage.toString();
}

/**
 * Utility function to get damage effectiveness description
 */
export function getEffectivenessDescription(multiplier: number): string {
  if (multiplier >= 2.0) return 'Very Effective';
  if (multiplier >= 1.5) return 'Effective';
  if (multiplier > 1.0) return 'Slightly Effective';
  if (multiplier === 1.0) return 'Normal';
  if (multiplier >= 0.65) return 'Resisted';
  return 'Highly Resisted';
}