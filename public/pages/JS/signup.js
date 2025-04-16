document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('input[name="fullName"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value.trim();
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value.trim();

    if (password !== confirmPassword) {
      alert(" Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert(`${result.message || result.error || 'Signup failed.'}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(" Something went wrong.");
    }
  });
});
