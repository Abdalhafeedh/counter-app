'use strict';

// DOM elements cache
const countDisplay = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Counter state
let count = 0;

/**
 * Updates the view with current count and manages button states
 */
function updateView() {
    // Update the count display
    countDisplay.textContent = count;
    
    // Add animation class for visual feedback
    countDisplay.classList.add('count-changed');
    setTimeout(() => {
        countDisplay.classList.remove('count-changed');
    }, 300);
    
    // Update button states based on count
    const isZero = count === 0;
    
    // Disable/enable decrement button
    decrementBtn.disabled = isZero;
    decrementBtn.setAttribute('aria-disabled', isZero.toString());
    
    // Disable/enable reset button (optional - only when count is 0)
    resetBtn.disabled = isZero;
    resetBtn.setAttribute('aria-disabled', isZero.toString());
    
    // Update ARIA live region for screen readers
    countDisplay.setAttribute('aria-label', `Current count is ${count}`);
}

/**
 * Increments the counter by 1
 */
function increment() {
    count++;
    updateView();
}

/**
 * Decrements the counter by 1 (prevents negative values)
 */
function decrement() {
    if (count > 0) {
        count--;
        updateView();
    }
}

/**
 * Resets the counter to 0
 */
function reset() {
    count = 0;
    updateView();
}

/**
 * Handles keyboard events for accessibility
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboard(event) {
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            increment();
            break;
        case 'ArrowDown':
            event.preventDefault();
            decrement();
            break;
        case 'r':
        case 'R':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                reset();
            }
            break;
    }
}

/**
 * Initializes the application
 */
function init() {
    // Add event listeners for button clicks
    incrementBtn.addEventListener('click', increment);
    decrementBtn.addEventListener('click', decrement);
    resetBtn.addEventListener('click', reset);
    
    // Add keyboard event listener for accessibility
    document.addEventListener('keydown', handleKeyboard);
    
    // Initialize the view
    updateView();
    
    // Focus management for better UX
    incrementBtn.focus();
    
    console.log('Counter app initialized successfully!');
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
