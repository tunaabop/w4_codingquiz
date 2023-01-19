var scoresBtn = document.querySelector("#view-highest");
var clearBtn = document.querySelector("#clear");

// Rank previous scores in order by retrieving scores from localStorage

function printScores() {
    var highscores = JSON.parse(window.localStorage.getItem("scores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      var liEl = document.createElement("li");
      liEl.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liEl);
    });
}

// Clear previous scores when users click clear 
function clearScores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
} 
  
printScores();
clearBtn.onclick = clearScores;