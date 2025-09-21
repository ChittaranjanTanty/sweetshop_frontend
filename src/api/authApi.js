const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function loginUser(formData) {
  const res = await fetch(`${baseURL}/login/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // important for cookie-based JWT
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}
