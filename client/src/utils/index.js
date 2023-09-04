export const sleep = (ms) =>{
    return new Promise((resolve,reject)=>setTimeout(resolve,ms));
}
export function getRandomNumber(min, max) {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();
    
    // Scale the random number to the desired range
    const scaledNumber = randomNumber * (max - min + 1);
    
    // Shift the number to the desired starting point (minimum value)
    const finalNumber = Math.floor(scaledNumber) + min;
    
    return finalNumber;
  }
