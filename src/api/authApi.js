const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function loginUser(formData) {
  const urlEncodedData = new URLSearchParams(formData);

  const res = await fetch(`${baseURL}/login/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
    credentials: "include", // important for cookie-based JWT
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}
