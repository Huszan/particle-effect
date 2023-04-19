const particleWrapper = document.getElementById('particle-wrapper');
const loadingOverlay = document.getElementById('loading-overlay');

function getDropletTemplate() {
    let temp = document.getElementsByClassName('snowflake').item(0).cloneNode();
    temp.style.display = 'block';
    return temp;
}

class Particle extends HTMLElement {
    speed;
    lifespan;
    animation;

    constructor(
        speed = {
            x: 0,
            y: 0,
        },
        lifespan = 3000,
    ) {
        super();
        this.speed = speed;
        this.lifespan = lifespan;
    }

    startAnimation(animation) {
        animation();
        setTimeout(() => {
            this.remove();
        }, this.lifespan)
    }
}

customElements.define("particle-el", Particle);

function fallAnimation(particle) {
    particle.animate([
        {transform: `translate(0, 0)`, offset: 0},
        {opacity: 100, offset: 0.5},
        {opacity: 0, offset: 0.9},
        {opacity: 0, transform: `translate(${1000 * particle.speed.x}px, ${1000 * particle.speed.y}px)`, offset: 1},
    ], {
        duration: particle.lifespan,
        iterations: 1,
    })
}

function getRandomNumber(min, max) {
    let rand = Math.random();
    return rand * (max - min) + min;
}

function snowflakeParticle() {
    let angle = getRandomNumber(-2, 2);
    let scale = getRandomNumber(0.3, 1);
    let el = new Particle({x: 0, y: scale * 4}, 10000);
    el.style.scale = scale;
    el.style.left = `${getRandomNumber(0, particleWrapper.offsetWidth)}px`;
    el.style.top = `-50px`;
    el.style.rotate = `${angle * 5}deg`
    el.appendChild(getDropletTemplate());
    return el;
}

setInterval(() => {
    let particle = snowflakeParticle();
    particleWrapper.appendChild(particle);
    particle.startAnimation(() => fallAnimation(particle))
}, 25)

addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loadingOverlay.classList.toggle('fade');
    }, 200)
})
