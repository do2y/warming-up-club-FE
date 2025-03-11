

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const choice = button.dataset.choice;
        playGame(choice);
    });
});

