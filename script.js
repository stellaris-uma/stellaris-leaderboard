// Fetch leaderboard data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = ''; // Clear the table before adding new rows

    data.forEach(player => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.fans.toLocaleString()}</td>
        <td>${player.fansGained.toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error('Error loading leaderboard:', err);
  });
