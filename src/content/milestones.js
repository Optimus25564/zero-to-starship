const mods = import.meta.glob('./levels/*.js', { eager: true })

export const MILESTONES = Object.fromEntries(
  Object.values(mods)
    .filter((m) => m.milestone)
    .map((m) => [m.milestone.id, { title: m.milestone.title, fact: m.milestone.fact }]),
)
