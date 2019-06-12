import { TodoModel } from ".";

/** TodoMVC model definitions **/


export interface ListModel {
  id: number;
  name: string;
  list: TodoModel[];
  completed: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  //isSelected: boolean;
>>>>>>> a56cdf5ccdb97b809d7c1262794a45e3f6d47fa8
}
=======
  isSelected: boolean;
}
>>>>>>> 0be4477909cf9f148ac10f7c0d2779a77ac29321
