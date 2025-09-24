// Borderlands 4 Damage Calculator Types

export enum WeaponType {
  ASSAULT_RIFLE = 'Assault Rifle',
  SHOTGUN = 'Shotgun',
  PISTOL = 'Pistol',
  SMG = 'SMG',
  SNIPER_RIFLE = 'Sniper Rifle',
  ROCKET_LAUNCHER = 'Rocket Launcher',
  GRENADE_MOD = 'Grenade Mod',
}

export enum DamageType {
  KINETIC = 'Kinetic',
  INCENDIARY = 'Incendiary',
  SHOCK = 'Shock',
  CORROSIVE = 'Corrosive',
  CRYO = 'Cryo',
  RADIATION = 'Radiation',
}

export enum Difficulty {
  NORMAL = 'Normal',
  TRUE_VAULT_HUNTER = 'True Vault Hunter Mode',
  ULTIMATE_VAULT_HUNTER = 'Ultimate Vault Hunter Mode',
  MAYHEM_1 = 'Mayhem 1',
  MAYHEM_2 = 'Mayhem 2',
  MAYHEM_3 = 'Mayhem 3',
  MAYHEM_4 = 'Mayhem 4',
  MAYHEM_5 = 'Mayhem 5',
  MAYHEM_6 = 'Mayhem 6',
  MAYHEM_7 = 'Mayhem 7',
  MAYHEM_8 = 'Mayhem 8',
  MAYHEM_9 = 'Mayhem 9',
  MAYHEM_10 = 'Mayhem 10',
}

export enum EnemyType {
  FLESH = 'Flesh',
  ARMOR = 'Armor',
  SHIELD = 'Shield',
  ROBOT = 'Robot',
  FROZEN = 'Frozen',
}

export interface WeaponStats {
  baseDamage: number;
  damageType: DamageType;
  weaponType: WeaponType;
  fireRate: number;
  accuracy: number;
  criticalMultiplier: number;
  pelletCount?: number; // For shotguns
  splashDamage?: number;
  splashRadius?: number;
}

export interface Weapon {
  id: string;
  name: string;
  manufacturer: string;
  rarity: string;
  level: number;
  stats: WeaponStats;
}

export interface DifficultyModifiers {
  healthMultiplier: number;
  damageMultiplier: number;
  experienceMultiplier: number;
  lootMultiplier: number;
}

export interface DamageCalculationInput {
  weapon: Weapon;
  difficulty: Difficulty;
  enemyType: EnemyType;
  isCriticalHit: boolean;
  playerLevel: number;
  enemyLevel: number;
  additionalModifiers?: {
    weaponDamageBonus?: number;
    elementalDamageBonus?: number;
    criticalDamageBonus?: number;
  };
}

export interface DamageCalculationResult {
  baseDamage: number;
  scaledDamage: number;
  elementalEffectiveness: number;
  criticalDamage: number;
  finalDamage: number;
  dps: number;
  breakdown: {
    levelScaling: number;
    difficultyModifier: number;
    elementalModifier: number;
    criticalModifier: number;
    additionalModifiers: number;
  };
}

export interface ElementalEffectiveness {
  [EnemyType.FLESH]: { [key in DamageType]: number };
  [EnemyType.ARMOR]: { [key in DamageType]: number };
  [EnemyType.SHIELD]: { [key in DamageType]: number };
  [EnemyType.ROBOT]: { [key in DamageType]: number };
  [EnemyType.FROZEN]: { [key in DamageType]: number };
}