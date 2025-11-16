let score = JSON.parse(localStorage.getItem('score'));

      if (!score) {
        score = { Wins: 0, Losses: 0, Ties: 0 };
      }

      updateScoreElement();

      function playGame(playerMove) {
        const move = pickComputerMove();
        let result = "";

        if (playerMove === "rock") {
          if (move === "rock") result = "tie";
          else if (move === "paper") result = "lose";
          else result = "win";
        } else if (playerMove === "paper") {
          if (move === "rock") result = "win";
          else if (move === "paper") result = "tie";
          else result = "lose";
        } else {
          if (move === "rock") result = "lose";
          else if (move === "paper") result = "win";
          else result = "tie";
        }

        // update score
        if (result === "win") score.Wins++;
        else if (result === "lose") score.Losses++;
        else score.Ties++;

        localStorage.setItem("score", JSON.stringify(score));
        updateScoreElement();

        document.querySelector(".js-verdict").innerHTML = `
          You: <img src="${playerMove}-emoji.png" class="move-icon">
          <img src="${move}-emoji.png" class="move-icon"> :Computer
          <br><br>
          Result: ${result.toUpperCase()}
        `;
      }

      function pickComputerMove() {
        const random = Math.random();

        if (random < 1 / 3) return "rock";
        else if (random < 2 / 3) return "paper";
        else return "scissors";
      }

      function updateScoreElement() {
        document.querySelector(".js-score").innerHTML =
          `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
      }

      function reset() {
        score = { Wins: 0, Losses: 0, Ties: 0 };
        localStorage.removeItem("score");
        updateScoreElement();
      }