const starsContainer = document.getElementById('starsContainer');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

let quillMode = false;
let keySequence = [];
let modifiersHeld = false;

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey) {
        modifiersHeld = true;
        const key = e.key.toLowerCase();

        const keyMap = {
            'µ': 'm',
            'â': 'm',
            'å': 'a',
            'ä': 'a',
            'm': 'm',
            'a': 'a'
        };

        if (keyMap[key]) {
            const normalizedKey = keyMap[key];
            keySequence.push(normalizedKey);

            if (keySequence.length >= 2) {
                const lastTwo = keySequence.slice(-2).join('');
                if (lastTwo === 'ma') {
                    quillMode = !quillMode;
                    toggleQuillMode(quillMode);
                    keySequence = [];
                }
            }
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (!e.altKey || !e.shiftKey) {
        modifiersHeld = false;
        keySequence = [];
    }
});

function toggleQuillMode(enabled) {
    const quillBtns = document.querySelectorAll('.quill-btn');

    quillBtns.forEach(btn => {
        if (enabled) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function addTally(btn) {
    if (!quillMode) {
        return;
    }

    btn.classList.add('drawing');


    btn.addEventListener('animationend', () => {
        btn.classList.remove('drawing');
        btn.style.transform = '';
        btn.style.opacity = '';
    }, { once: true });

    const cell = btn.parentElement;
    const tallyContainer = cell.querySelector('.tally-marks');
    let groups = tallyContainer.querySelectorAll('.tally-group');
    let lastGroup = groups[groups.length - 1];

    if (!lastGroup || lastGroup.querySelectorAll('.tally').length >= 5) {
        lastGroup = document.createElement('div');
        lastGroup.className = 'tally-group';
        tallyContainer.appendChild(lastGroup);
    }

    const verticalsInGroup = lastGroup.querySelectorAll('.tally:not(.diagonal)').length;

    if (verticalsInGroup < 4) {
        const tally = document.createElement('div');
        tally.className = 'tally';
        lastGroup.appendChild(tally);
    } else {
        const tally = document.createElement('div');
        tally.className = 'tally diagonal';
        lastGroup.appendChild(tally);
    }
}