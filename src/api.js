const API_BASE = "http://localhost:3000"; 

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await res.json();
  return data.tasks;
}

export async function createTask(task) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create task");
  }
  const data = await res.json();
  return data.task;
}

export async function updateTask(taskId, updateData) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update task");
  }
  const data = await res.json();
  return data.task;
}

export async function deleteTask(taskId) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete task");
  }
  return true;
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();
  return data.categories;
}