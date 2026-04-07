export interface GamificationState {
  xp: number;
  level: string;
  progressPercent: number;
  nextLevelXp: number;
}

const LVL_EXPLORER = 100;
const LVL_BUILDER = 250;

/**
 * Calculates current level and progress out of the current XP tier
 */
export function getGamificationState(xp: number): GamificationState {
  let level = "Beginner";
  let progressPercent = 0;
  let nextLevelXp = LVL_EXPLORER;

  if (xp >= LVL_BUILDER) {
    level = "Builder";
    progressPercent = 100; // max level
    nextLevelXp = xp;
  } else if (xp >= LVL_EXPLORER) {
    level = "Explorer";
    const tierSize = LVL_BUILDER - LVL_EXPLORER;
    const currentProgress = xp - LVL_EXPLORER;
    progressPercent = Math.round((currentProgress / tierSize) * 100);
    nextLevelXp = LVL_BUILDER;
  } else {
    level = "Beginner";
    progressPercent = Math.round((xp / LVL_EXPLORER) * 100);
    nextLevelXp = LVL_EXPLORER;
  }

  return { xp, level, progressPercent, nextLevelXp };
}

/**
 * Returns current XP from local storage
 */
export function getLocalXP(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('userXP') || '0', 10);
}

/**
 * Adds XP, saves to local storage, and returns the new gamification state
 */
export function addXP(amount: number): GamificationState {
  if (typeof window === 'undefined') return getGamificationState(0);
  
  const currentXp = getLocalXP();
  const newXp = currentXp + amount;
  localStorage.setItem('userXP', newXp.toString());
  
  // Custom event to globally notify components about level change
  window.dispatchEvent(new CustomEvent('xp_updated'));
  
  return getGamificationState(newXp);
}
