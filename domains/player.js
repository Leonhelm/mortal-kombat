export const createPlayer = (charter) => ({
  ...charter,
  changeHP,
  hasLose,
});

function changeHP(damage) {
  const hpAfter = this.hp - damage;
  this.hp = hpAfter < 0 ? 0 : hpAfter;
}

function hasLose() {
  return this.hp === 0;
}
