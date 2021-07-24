export class Car {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public imagePath: string,
    public variance: {
      info: string,
      price: number
    }
  ) {}
}

