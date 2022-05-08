const questions = [
    'Do you like board games?',
    'Do you like strategic games?',
    'Do you like team games?',
    'Do you like one on one games?',
    'Do you like to play chess?',
    'Do you like to play chess frequently?',
    'Do you prefer knights over bishops?',
    'Do you prefer a queen over two rooks?',
    'Do you prefer to make pawn sacrifices?',
    'Do you prefer to make major piece sacrifices?'
]
//Display questions and answers
for (let i = 0; i < 10; i++) {
    let question = $(`<div class='questionBar' id='question${i}'><h6>${questions[i]}</h6></div>`)

    let answers = $(`
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-outline-danger mr-1">
                  <input type="radio" name="options-${i}" value=1 checked> No way!
              </label>
              <label class="btn btn-outline-warning mr-1">
                  <input type="radio" name="options-${i}" value=2> Not really
              </label>
              <label class="btn btn-outline-secondary mr-1">
                  <input type="radio" name="options-${i}" value=3> No preference
              </label>
              <label class="btn btn-outline-primary mr-1">
                  <input type="radio" name="options-${i}" value=4> Yes, kinda
              </label>
              <label class="btn btn-outline-success mr-1">
                  <input type="radio" name="options-${i}" value=5> Absolutely!
              </label>
          </div>
          <br>
      `)

    $('#survey').append(question)
    $('#survey').append(answers)
}
//Get user info and route to server
$('#userInfo').on('submit', e => {
    e.preventDefault()
    let userName = $('#userName').val()
    let userPhoto = $('#userPhoto').val()
    let answers = []
    for (let i = 0; i < 10; i++) {
        answers.push(parseInt($(`input[name=options-${i}]:checked`).val()))
    }

    let user = {
        name: userName,
        photo: userPhoto,
        scores: answers
    }

    $.post("/api/friends", user).then(player => {
        $('#survey').empty()
        $('#userInfo').addClass('invisible')
        $('#surveyHeading').text('Thanks for taking the survey!')

        let matchCard = $(`
            <div class="card text-dark" style="width: 18rem">
                <img class="card-img-top" src="${player.photo}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">It's a match!</h5>
                    <p class="card-text">You were matched with ${player.name}!</p>
                </div>
            </div>
        `)

        $('#survey').append(matchCard)


        console.log("posting response data: ", player)
    })
})