export function evaluateLevel(level, paramValues) {
  const derived = level.compute(paramValues)
  const goalMet = level.goal.check(derived)
  return { derived, goalMet }
}
