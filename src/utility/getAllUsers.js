export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:5555/users");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
