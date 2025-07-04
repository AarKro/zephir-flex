const leftBackgroundElement = document.getElementById('backgroundLeft');
const rightBackgroundElement = document.getElementById('backgroundRight');
const rootElement = document.querySelector(':root');
const defaultAnimationDelay = 500;

const animationSteps = [
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}z`; 
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-pink)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}e`;
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-lavender)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}p`;
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-pink)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}h`;
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-lavender)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}i`;
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-pink)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.innerHTML = `${leftBackgroundElement.innerHTML}r`;
      
      leftBackgroundElement.style.backgroundColor = 'var(--color-lavender)';
    }, defaultAnimationDelay
  ],
  [
    () => {
      leftBackgroundElement.style.padding = '0.1em';
      leftBackgroundElement.style.width = '50%';
      rightBackgroundElement.style.padding = '0.1em';
      rightBackgroundElement.style.width = '50%';
    }, defaultAnimationDelay
  ],
  [
    () => {
       const hiddenExtenders = document.getElementsByClassName('hiddenExtender');
      Array.from(hiddenExtenders).forEach(extender => extender.style.flexGrow = '1');
    }, defaultAnimationDelay
  ],
  [
    () => {
      rootElement.style.setProperty('--font-weight', '180');
    }, defaultAnimationDelay
  ],
  [
    () => {
      rootElement.style.setProperty('--font-flex', '100');
      // leftBackgroundElement.style.transform = 'rotate(-20deg)';
      // rightBackgroundElement.style.transform = 'rotate(-20deg)';
    }, defaultAnimationDelay
  ],
];


window.addEventListener('DOMContentLoaded', () => {
  animationSteps.reduce((totalDelay, [step, delay]) => {
    const nextDelay = totalDelay + delay;
    setTimeout(step, nextDelay);
  
    return nextDelay;
  }, 0);
});