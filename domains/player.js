class Player {
  constructor({ player, name, hp, img }) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = img;
  }

  changeHP = (damage) => {
    const hpAfter = this.hp - damage;
    this.hp = hpAfter < 0 ? 0 : hpAfter;
  };

  hasLose = () => {
    return this.hp === 0;
  };
}

export const createPlayer = (charter) => new Player(charter);
