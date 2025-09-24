import { 
  Difficulty, 
  DifficultyModifiers, 
  ElementalEffectiveness, 
  DamageType, 
  EnemyType,
  Weapon,
  WeaponType
} from '../types';

// Difficulty modifiers based on Borderlands game mechanics
export const DIFFICULTY_MODIFIERS: Record<Difficulty, DifficultyModifiers> = {
  [Difficulty.NORMAL]: {
    healthMultiplier: 1.0,
    damageMultiplier: 1.0,
    experienceMultiplier: 1.0,
    lootMultiplier: 1.0,
  },
  [Difficulty.TRUE_VAULT_HUNTER]: {
    healthMultiplier: 2.5,
    damageMultiplier: 1.5,
    experienceMultiplier: 1.5,
    lootMultiplier: 1.2,
  },
  [Difficulty.ULTIMATE_VAULT_HUNTER]: {
    healthMultiplier: 4.0,
    damageMultiplier: 2.0,
    experienceMultiplier: 2.0,
    lootMultiplier: 1.5,
  },
  [Difficulty.MAYHEM_1]: {
    healthMultiplier: 3.0,
    damageMultiplier: 3.0,
    experienceMultiplier: 3.0,
    lootMultiplier: 3.0,
  },
  [Difficulty.MAYHEM_2]: {
    healthMultiplier: 4.5,
    damageMultiplier: 4.5,
    experienceMultiplier: 4.5,
    lootMultiplier: 4.5,
  },
  [Difficulty.MAYHEM_3]: {
    healthMultiplier: 6.8,
    damageMultiplier: 6.8,
    experienceMultiplier: 6.8,
    lootMultiplier: 6.8,
  },
  [Difficulty.MAYHEM_4]: {
    healthMultiplier: 10.0,
    damageMultiplier: 10.0,
    experienceMultiplier: 10.0,
    lootMultiplier: 10.0,
  },
  [Difficulty.MAYHEM_5]: {
    healthMultiplier: 15.0,
    damageMultiplier: 15.0,
    experienceMultiplier: 15.0,
    lootMultiplier: 15.0,
  },
  [Difficulty.MAYHEM_6]: {
    healthMultiplier: 22.0,
    damageMultiplier: 22.0,
    experienceMultiplier: 22.0,
    lootMultiplier: 22.0,
  },
  [Difficulty.MAYHEM_7]: {
    healthMultiplier: 33.0,
    damageMultiplier: 33.0,
    experienceMultiplier: 33.0,
    lootMultiplier: 33.0,
  },
  [Difficulty.MAYHEM_8]: {
    healthMultiplier: 50.0,
    damageMultiplier: 50.0,
    experienceMultiplier: 50.0,
    lootMultiplier: 50.0,
  },
  [Difficulty.MAYHEM_9]: {
    healthMultiplier: 75.0,
    damageMultiplier: 75.0,
    experienceMultiplier: 75.0,
    lootMultiplier: 75.0,
  },
  [Difficulty.MAYHEM_10]: {
    healthMultiplier: 112.0,
    damageMultiplier: 112.0,
    experienceMultiplier: 112.0,
    lootMultiplier: 112.0,
  },
};

// Elemental effectiveness chart
export const ELEMENTAL_EFFECTIVENESS: ElementalEffectiveness = {
  [EnemyType.FLESH]: {
    [DamageType.KINETIC]: 1.0,
    [DamageType.INCENDIARY]: 1.5,
    [DamageType.SHOCK]: 0.65,
    [DamageType.CORROSIVE]: 0.65,
    [DamageType.CRYO]: 1.0,
    [DamageType.RADIATION]: 1.0,
  },
  [EnemyType.ARMOR]: {
    [DamageType.KINETIC]: 1.0,
    [DamageType.INCENDIARY]: 0.65,
    [DamageType.SHOCK]: 0.65,
    [DamageType.CORROSIVE]: 1.75,
    [DamageType.CRYO]: 1.0,
    [DamageType.RADIATION]: 1.0,
  },
  [EnemyType.SHIELD]: {
    [DamageType.KINETIC]: 1.0,
    [DamageType.INCENDIARY]: 0.65,
    [DamageType.SHOCK]: 2.0,
    [DamageType.CORROSIVE]: 0.65,
    [DamageType.CRYO]: 0.5,
    [DamageType.RADIATION]: 1.0,
  },
  [EnemyType.ROBOT]: {
    [DamageType.KINETIC]: 1.0,
    [DamageType.INCENDIARY]: 0.65,
    [DamageType.SHOCK]: 1.5,
    [DamageType.CORROSIVE]: 1.75,
    [DamageType.CRYO]: 0.5,
    [DamageType.RADIATION]: 0.1,
  },
  [EnemyType.FROZEN]: {
    [DamageType.KINETIC]: 3.0,
    [DamageType.INCENDIARY]: 3.0,
    [DamageType.SHOCK]: 3.0,
    [DamageType.CORROSIVE]: 3.0,
    [DamageType.CRYO]: 1.0,
    [DamageType.RADIATION]: 3.0,
  },
};

// Sample weapons for testing
export const SAMPLE_WEAPONS: Weapon[] = [
  {
    id: 'jakobs-pistol-1',
    name: 'Jakobs Revolver',
    manufacturer: 'Jakobs',
    rarity: 'Common',
    level: 50,
    stats: {
      baseDamage: 1200,
      damageType: DamageType.KINETIC,
      weaponType: WeaponType.PISTOL,
      fireRate: 2.5,
      accuracy: 85,
      criticalMultiplier: 2.0,
    },
  },
  {
    id: 'maliwan-smg-1',
    name: 'Maliwan Pulsar',
    manufacturer: 'Maliwan',
    rarity: 'Rare',
    level: 50,
    stats: {
      baseDamage: 850,
      damageType: DamageType.SHOCK,
      weaponType: WeaponType.SMG,
      fireRate: 8.5,
      accuracy: 75,
      criticalMultiplier: 1.5,
    },
  },
  {
    id: 'hyperion-shotgun-1',
    name: 'Hyperion Butcher',
    manufacturer: 'Hyperion',
    rarity: 'Epic',
    level: 50,
    stats: {
      baseDamage: 2200,
      damageType: DamageType.KINETIC,
      weaponType: WeaponType.SHOTGUN,
      fireRate: 1.2,
      accuracy: 65,
      criticalMultiplier: 1.8,
      pelletCount: 8,
    },
  },
  {
    id: 'vladof-assault-1',
    name: 'Vladof Sickle',
    manufacturer: 'Vladof',
    rarity: 'Uncommon',
    level: 50,
    stats: {
      baseDamage: 950,
      damageType: DamageType.KINETIC,
      weaponType: WeaponType.ASSAULT_RIFLE,
      fireRate: 6.8,
      accuracy: 80,
      criticalMultiplier: 1.6,
    },
  },
  {
    id: 'dahl-sniper-1',
    name: 'Dahl Sandhawk',
    manufacturer: 'Dahl',
    rarity: 'Legendary',
    level: 50,
    stats: {
      baseDamage: 4500,
      damageType: DamageType.CORROSIVE,
      weaponType: WeaponType.SNIPER_RIFLE,
      fireRate: 1.8,
      accuracy: 95,
      criticalMultiplier: 3.5,
    },
  },
];

// Level scaling constants
export const LEVEL_SCALING_BASE = 1.13;
export const MAX_LEVEL = 72;
export const MIN_LEVEL = 1;