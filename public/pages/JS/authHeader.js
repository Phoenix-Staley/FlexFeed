document.addEventListener("DOMContentLoaded", async () => {
    const rightHeader = document.getElementById("right-header");
  
    try {
      const res = await fetch("/api/users/session");
      const session = await res.json();
  
      rightHeader.innerHTML = "";
  
      if (session.logged_in) {
        const logoutBtn = document.createElement("button");
        logoutBtn.className = "button is-danger";
        logoutBtn.style.marginTop = "-5px";
        logoutBtn.textContent = "Logout";
        logoutBtn.addEventListener("click", async () => {
          await fetch("/api/users/logout", { method: "POST" });
          window.location.reload(); 
        });
  
        rightHeader.appendChild(logoutBtn);
      } else {
        rightHeader.innerHTML = `
          <a href="/pages/login.html" class="px-4">Login</a>
          <a href="/pages/signup.html" class="px-4">Sign up</a>
        `;
      }
    } catch (err) {
      console.error("Auth header error:", err);
    }
  });
  