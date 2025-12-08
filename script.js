// Load data from data.json and build leaderboard
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#leaderboard tbody");

    // Sort by fans descending
    data.sort((a, b) => b.fans - a.fans);

    // Calculate fans gained as difference from previous day
    data.forEach((player, index) => {
      const previousFans = player.previousFans ?? 0; // optional fallback
      player.fansGained = player.fans - previousFans;
    });

    // Inject rows into the table
    data.forEach((player, index) => {
      const row = document.createElement("tr");

      // Determine color for fans gained
      const gained = player.fansGained;
      let color = "black";
      if (gained > 0) color = "green";
      if (gained < 0) color = "red";

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.fans.toLocaleString()}</td>
        <td class="fans-gained" style="color:${color}">
          ${gained > 0 ? "+" : ""}${gained.toLocaleString()}
        </td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(error => console.error("Error loading leaderboard:", error));
