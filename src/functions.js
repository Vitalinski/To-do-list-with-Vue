import { useToDoStore } from "./store/store";
export function convertToArrayStructure(object) {
  const resultArray = [];
  let store = useToDoStore();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const column = {
        name: key,
        tasks: [],
      };

      const tasksObject = object[key];

      for (const taskKey in tasksObject) {
        if (tasksObject.hasOwnProperty(taskKey)) {
          column.tasks.push(tasksObject[taskKey]);
        }
      }

      resultArray.push(column);
    }
  }
  useToDoStore().arrTasks = resultArray;
}

export function convertToObjectStructure(array) {
  let store = useToDoStore();

  const resultObject = {};

  array.forEach((column) => {
    resultObject[column.name] = {};
    column.tasks.forEach((task) => {
      resultObject[column.name][task.id] = { ...task };
    });
  });
  store.tasks = resultObject;
}
