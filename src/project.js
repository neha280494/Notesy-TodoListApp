export function task(
  title,
  project,
  description = "",
  dueDate = "",
  priority = "",
) {
  return {
    title,
    project,
    description,
    dueDate,
    priority,
  };
}

export function project(title) {
  return {
    title,
  };
}

export let projects = [
  { title: "Groceries" },
  { title: "Vacation Shopping" },
  { title: "Back To School Shopping" },
];

export let tasks = [
  {
    title: "Buy Basics",
    project: "Groceries",
    description: "Eggs, Milk, Bread",
    dueDate: "2026-04-01",
    priority: "high",
  },
  {
    title: "Buy Toiletories",
    project: "Groceries",
    description: "Toothpaste, Soap, Shampoo",
    dueDate: "2026-04-01",
    priority: "high",
  },
  {
    title: "Buy Resortwear",
    project: "Vacation Shopping",
    description: "Pants, Skirts, Tops, Dresses",
    dueDate: "2026-04-01",
    priority: "low",
  },
  {
    title: "Buy swimwear",
    project: "Vacation Shopping",
    description: "Swimsuit, swimcap, goggles, sunscreen",
    dueDate: "2026-04-01",
    priority: "low",
  },
  {
    title: "Buy Clothes",
    project: "Back To School Shopping",
    description: "Pants, Skirts, Tops, Dresses",
    dueDate: "2026-04-01",
    priority: "low",
  },
  {
    title: "Buy Stationery",
    project: "Back To School Shopping",
    description: "Books, Pens, Colors, Pencils, Eraser",
    dueDate: "2026-04-01",
    priority: "low",
  },
];

export function updateTasks(newtasks) {
  tasks = newtasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function updateProjects(newprojects) {
  projects = newprojects;
  localStorage.setItem("projects", JSON.stringify(projects));
}
