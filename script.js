// script.js
async function loadLeaderboard() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Calculate fans gained dynamically
    data.forEach(player => {
      player.fansGained = player.currentFans - player.initialFans;
    });

    // Determine if this is the initial leaderboard (all fansGained = 0)
    const isInitial = data.every(player => player.fansGained === 0);

    // Sort data based on condition
    if (isInitial) {
      // Initial leaderboard → sort by total fans
      data.sort((a, b) => b.currentFans - a.currentFans);
    } else {
      // Bi-weekly update → sort by fans gained (tie-breaker = total fans)
      data.sort((a, b) => {
        if (b.fansGained !== a.fansGained) {
          return b.fansGained - a.fansGained;
        } else {
          return b.currentFans - a.currentFans;
        }
      });
    }

    // Render the table
    const tableBody = document.querySelector('#leaderboard tbody');
    tableBody.innerHTML = '';

    data.forEach((player, index) => {
      const row = document.createElement('tr');

      // Determine color for Fans Gained
      const fansGainedColor = player.fansGained > 0 ? '#32CD32' : '#000000'; // light green or default

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.currentFans.toLocaleString()}</td>
        <td style="color: ${fansGainedColor}; font-weight: bold;">
          ${player.fansGained.toLocaleString()}
        </td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}

// Run on page load
loadLeaderboard();
