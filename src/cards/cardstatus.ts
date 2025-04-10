import { FlashCard } from './flashcard.js'

interface SuccessWithTimestamp {
    success : boolean
    timestamp : Date
}

interface CardStatus {
  /**
   * Retrieves the {@link edu.cmu.cs214.hw1.cards.FlashCard} associated with this {@code CardStatus}.
   *
   * @return The associated {@link edu.cmu.cs214.hw1.cards.FlashCard}.
   */
  getCard: () => FlashCard

  /**
   * Retrieves the record of past successes at answering this card.
   *
   * @return A list of boolean's indicating the recorded outcome of previous attempts to answer this card.
   */
  getResults: () => SuccessWithTimestamp[]

  /**
   * Updates the internal success tracker with a new answering outcome.
   *
   * @param success {@code true} if this card was answered correctly.
   */
  recordResult: (success: boolean) => void

  /**
   * Resets the record of past answering outcomes.
   */
  clearResults: () => void
};

/**
 * Creates a new {@link CardStatus} instance.
 *
 * @param card The {@link FlashCard} card to track answer correctness for.
 */
function newCardStatus (card: FlashCard): CardStatus {
  let successes: SuccessWithTimestamp[] = []
  return {
    getCard: function (): FlashCard { return card },
    getResults: function (): SuccessWithTimestamp[] { return successes.slice() },
    recordResult: function (success: boolean): void { successes.push({success, timestamp : new Date()}) },
    clearResults: function (): void { successes = [] }
  }
};

export { CardStatus, newCardStatus }
