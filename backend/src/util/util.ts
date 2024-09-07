import crypto from 'crypto'

export function secureMathRandom() {
    const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes  
    const hexValue = randomBytes.toString('hex'); // Convert the bytes to a hex string  
    const intValue = parseInt(hexValue, 16); // Convert the hex string to an integer  
    const maxIntValue = 0xFFFFFFFF; // Max value for 4 bytes (32-bit unsigned integer)

    return intValue / (maxIntValue + 1); // Normalize to a value between 0 and 1
}