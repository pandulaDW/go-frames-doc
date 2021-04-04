export interface Person {
  name: string;
  age: number;
  sys: {
    id: string;
  };
}

export interface PersonCollection {
  personCollection: {
    items: Array<Person>;
  };
}
