export function thrust(massFlow, exhaustVelocity) {
  return massFlow * exhaustVelocity
}

export function weight(massKg, g = 9.81) {
  return massKg * g
}

export function twr(thrustN, weightN) {
  return thrustN / weightN
}

export function deltaV(exhaustVelocity, fuelFraction) {
  if (fuelFraction <= 0) return 0
  return exhaustVelocity * Math.log(1 / (1 - fuelFraction))
}

export function reachedOrbit(deltaVValue, targetVelocity = 7800) {
  return deltaVValue >= targetVelocity
}
