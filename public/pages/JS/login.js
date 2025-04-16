document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value.trim();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (response.ok) {
        window.location.href = "/index.html";
      } else {
        alert(`${result.message || result.error || 'Login failed.'}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }
  });
});
