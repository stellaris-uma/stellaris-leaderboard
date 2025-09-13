fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = ''; // Clear table first
    data.forEach(player => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.fans}</td>
        <td>${player.fansGained}</td> <!-- new column -->
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error('Error loading leaderboard:', err));
