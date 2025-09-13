// script.js

// Fetch the leaderboard data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Calculate fansGained for each player
    data.forEach(player => {
      player.fansGained = player.currentFans - player.initialFans;
    });

    // Sort by fansGained descending; if 0, sort by currentFans descending
    data.sort((a, b) => {
      return (b.fansGained - a.fansGained) || (b.currentFans - a.currentFans);
    });

    // Get the table body element
    const tableBody = document.querySelector('#leaderboard tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Populate the table
    data.forEach((player, index) => {
      const row = document.createElement('tr');

      // Assign medal classes for top 3
      if (index === 0) row.classList.add('gold');
      else if (index === 1) row.classList.add('silver');
      else if (index === 2) row.classList.add('bronze');

      // Fans Gained color: light green if > 0, black otherwise
      const fansGainedColor = player.fansGained > 0 ? '#32CD32' : '#000000';

      row.innerHTML = `
        <td>${index + 1}</td> <!-- Rank -->
        <td>${player.name}</td>
        <td>${player.currentFans.toLocaleString()}</td>
        <td style="color: ${fansGainedColor}; font-weight: bold;">
          ${player.fansGained.toLocaleString()}
        </td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error loading leaderboard data:', error);
  });
