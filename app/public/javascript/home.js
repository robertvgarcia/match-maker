//Get and display length of players
$.get('/api/friends', players =>
    $('#players').text(players.length)
)