"use strict";
document.addEventListener("DOMContentLoaded", function() {
    const buttonColours = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;

    // Start game
    document.addEventListener("keydown", function() {
        if (!started) {
            document.getElementById("level-title").textContent = `Level ${level}`;
            nextSequence();
            started = true;
        }
    });

    // Button clicks
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
        button.addEventListener("click", function() {
            if (started) {
                const userChosenColour = this.id;

                userClickedPattern.push(userChosenColour);

                playSound(userChosenColour);
                animatePress(userChosenColour);

                checkAnswer(userClickedPattern.length - 1);
            }
        });
    });

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }

        } else {

            playSound("wrong");

            document.body.classList.add("game-over");

            setTimeout(function() {
                document.body.classList.remove("game-over");
            }, 200);

            document.getElementById("level-title").textContent =
                "Game Over, Press Any Key to Restart";

            startOver();
        }
    }

    function nextSequence() {
        userClickedPattern = [];

        level++;

        document.getElementById("level-title").textContent =
            `Level ${level}`;

        const randomNumber = Math.floor(Math.random() * 4);

        const randomChosenColour = buttonColours[randomNumber];

        gamePattern.push(randomChosenColour);

        const button = document.getElementById(randomChosenColour);


        button.classList.add("flash");

        button.addEventListener("animationend", function() {
            button.classList.remove("flash");
        }, {
            once: true
        });

        playSound(randomChosenColour);
    }

    function playSound(name) {
        const audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColor) {
        const button = document.getElementById(currentColor);

        button.classList.add("pressed");

        setTimeout(function() {
            button.classList.remove("pressed");
        }, 100);
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});