/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-3-roll-an-ace

1. Run the unmodified exercise and observe that it works as advertised. Observe 
   that the die must be thrown an indeterminate number of times until we get an 
   ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDieUntil()` function using async/await and 
   without using recursion. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
import { rollDie } from '../../helpers/pokerDiceRoller.js';
/** @import {DieFace} from "../../helpers/pokerDiceRoller.js" */

/**
 * Rolls a die until the desired value is rolled.
 * @param {DieFace} desiredValue
 * @param {number} [maxAttempts=100]
 * @returns {Promise<DieFace>}
 */
export async function rollDieUntil(desiredValue, maxAttempts = 100) {
  let attempts = 0;

  while (true) {
    attempts += 1;
    try {
      const value = await rollDie();
      if (value === desiredValue) return value;

    } catch (err) {
      console.error(`Roll failed on attempt ${attempts}:`, err?.message ?? err);

      if (typeof err?.message === 'string' && /rolled off the table/i.test(err.message)) {
        throw err;
      }

      if (attempts >= maxAttempts) {
        throw new Error(`Gave up after ${attempts} attempts`);
      }
    }
  }
}


async function main() {
  try {
    const result = await rollDieUntil('ACE');
    console.log('Resolved!', result);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
