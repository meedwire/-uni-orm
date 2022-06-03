declare module "@meedwire/uni-orm" {
  export type ITable = { [K: string]: Function };

  export interface IDatabaseProvider {}

  export function sqliteProvider(): IDatabaseProvider {}

  export function watermellonProvider(): IDatabaseProvider {}

  export interface IInitializerOptions<T extends ITable> {
    databaseProvider: IDatabaseProvider;
    entities: T;
  }

  export type ISelectFields<T extends ITable> =
    (keyof T[keyof T]["prototype"])[];

  export type KeysEntity<T extends ITable> = (keyof T[keyof T]["prototype"])[];

  export type ISelectReturn<T> = {
    [P in typeof T[number]]: T["prototype"][P];
  }[];

  class UniDB<T extends ITable> {
    constructor(initializer: IInitializerOptions<T>) {}

    async connect() {}

    async table(name: keyof T): Omit<this, "table"> {}

    async select<Fields extends KeysEntity<T>>(
      fields: Fields
    ): Promise<
      typeof fields[number] extends "*"
        ? {}
        : {
            [P in Exclude<
              typeof fields[number],
              "*"
            >]: T[keyof T]["prototype"][P];
          }[]
    > {}

    async findOne<Fields extends KeysEntity<T>>(
      id: string,
      fields: Fields
    ): Promise<
      typeof fields[number] extends "*"
        ? {}
        : {
            [P in Exclude<
              typeof fields[number],
              "*"
            >]: T[keyof T]["prototype"][P];
          }[]
    > {}

    async deleteOne() {}

    async updateOne() {}

    async insert() {}
  }
}
