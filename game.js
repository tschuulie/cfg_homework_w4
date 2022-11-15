const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Your best friend is coming over for dinner and you want to cook their favourite meal: Spaghetti Pesto! Do you want to make the pesto sauce from scratch?',
        options: [
            {
                text: 'Yes, make it from scratch!',
                nextText: 2,
            },
            {
                text: 'No, buy ready-made sauce.',
                nextText: 3,
            }
        ]
    },
    {
        id: 2,
        text: 'You look up a recipe and need to buy the following ingredients: pine nuts, garlic, basil and parmesan cheese. You already have olive oil and spaghetti at home.',
        options: [
            {
                text: 'Go to the supermarket.',
                nextText: 4,
            },
        ]
    },
    {
        id: 3,
        text: 'You decided to buy pesto sauce instead of making it from scratch.',
        options: [
            {
                text: 'Go to the supermarket.',
                nextText: 5,
            },
        ]
    },
    {
        id: 4,
        text: 'The supermarket is out of pine nuts so what will you do?',
        options: [
            {
                text: 'Buy a glass of pesto sauce',
                nextText: 5,
            },
            {
                text: 'Buy cashew nuts instead',
                nextText: 6,
            }
        ]
    },
    {
        id: 5,
        text: 'You grab a big glass of delicious pesto sauce and on your way to the till you see some tiramisu on offer. Do you grab it for dessert?',
        options: [
            {
                text: 'No',
                nextText: 7,
            },
            {
                text: 'Yes',
                nextText: 8,
            }
        ]
    },
    {
        id: 6,
        text: 'You are sure you can substitute pine nuts with cashews and grab those instead. In your basket you have: cashews, basil & garlic. Are you ready to go to the till?',
        options: [
            {
                text: 'Yes, I want to pay and leave.',
                nextText: 9,
            },
            {
                text: 'No, I want to browse a bit longer.',
                nextText: 10,
            }
        ]
    },
    {
        id: 7,
        text: 'You decide against the tiramisu and make your way to tell till to check out.',
        options: [
            {
                text: 'Pay and go home.',
                nextText: 11,
            },
        ]
    },
    {
        id: 8,
        text: 'Yes, you remember your friend mentioning liking tiramisu so you add it to your basket and go to the till.',
        options: [
            {
                text: 'Pay and go home.',
                nextText: 11,
                setState: {tiramisu: true}
            },
        ]
    },
    {
        id: 9,
        text: 'At home you realise you forgot to buy parmesan cheese and there is not enough time to go back out and buy any. Oh well, it is a vegan pesto sauce now!',
        options: [
            {
                text: 'Start cooking.',
                nextText: 12,
            },
        ]
    },
    {
        id: 10,
        text: 'While browsing the supermarket you realise that you forgot the parmesan cheese! Phew! You get some and make your way to the till.',
        options: [
            {
                text: 'Pay and go home.',
                nextText: 11,
            },
        ]
    },
    {
        id: 11,
        text: 'You arrive home with everything you need for your dinner.',
        options: [
            {
                text: 'Start cooking.',
                nextText: 12,
            },
        ]
    },
    {
        id: 12,
        text: 'Your friend arrives on time and with a homemade tiramisu for dessert.',
        options: [
            {
                text: 'This is the perfect addition to our Italian-themed dinner!',
                nextText: 13,
            },
            {
                text: 'You laugh! Brilliant minds think alike!',
                requiredState: (currentState) => currentState.tiramisu,
                nextText: 13,
            },
        ]
    },
    {
        id: 13,
        text: 'You spend a lovely evening with your best friend!',
        options: [
            {
                text: 'Congratulations, you finished the game! Re-start for a different experience.',
                nextText: -1,
            }
        ]
    },
]

startGame()