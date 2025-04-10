import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  function getMostRecentMistakeTimestamp (cardStatus: CardStatus): number {
    const results = cardStatus.getResults();
    let latestMistakeTime = -Infinity;
    for (const result of results) {
      if (!result.success && result.timestamp.getTime() > latestMistakeTime) {
        latestMistakeTime = result.timestamp.getTime();
      }
    }
    return latestMistakeTime;
  };


  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const cardsWithLatestMistake = cards.map(cardStatus => ({
        card: cardStatus,
        latestMistakeTime: getMostRecentMistakeTimestamp(cardStatus),
      }));

      cardsWithLatestMistake.sort((a, b) => {
        // Sort by latest mistake time in descending order (most recent first)
        if (a.latestMistakeTime > b.latestMistakeTime) {
          return -1;
        }
        if (a.latestMistakeTime < b.latestMistakeTime) {
          return 1;
        }
        // If latest mistake times are equal, maintain original order (or some other stable sort)
        return 0;
      });

      // Extract the sorted CardStatus objects
      return cardsWithLatestMistake.map(item => item.card);
    }
  }
};

export { newRecentMistakesFirstSorter }
