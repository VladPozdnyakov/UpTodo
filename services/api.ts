type ItemData = {
  id: string;
  title: string;
};

export const fetchTodos = async (): Promise<ItemData[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Failed to load todos');
    }
    const result: ItemData[] = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to load todos');
  }
};
