export const utilService = {
    getRandomInt,
    getRandomAttackFactor,
    saveToStorage,
    loadFromStorage,
    triggerAnimation,
    getAccessToken,
    secureMathRandom
}

function getRandomInt(min: number, max: number) {
    return Math.floor(secureMathRandom() * (max - min)) + min
}

function getRandomAttackFactor() {
    return secureMathRandom() * (0.7 - 0.3) + 0.3
}

function saveToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string): any {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function triggerAnimation(element: HTMLElement, animationClass: string) {
    element.classList.remove(animationClass) // Remove the animation class to reset it
    void element.offsetWidth // Trigger a reflow to restart the animation
    element.classList.add(animationClass) // Re-add the animation class to start the animation
}

function getAccessToken(): string | null {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Check if the key matches the pattern
        if (key && key.startsWith('CognitoIdentityServiceProvider.') && key.endsWith('.accessToken')) {
            return localStorage.getItem(key) || null
        }
    }
    return null
}

function secureMathRandom() {
    const array = new Uint32Array(1); // Create a 32-bit unsigned integer array  
    window.crypto.getRandomValues(array); // Fill the array with random values  
    return array[0] / (0xFFFFFFFF + 1); // Normalize the value to be between 0 and 1
}