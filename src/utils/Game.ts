export interface CardType {
    id: string,
    shape: 'Heart' | 'Clover' | 'Circle';
    color: 'red' | 'green' | 'blue';
    count: 1 | 2 | 3;
    pattern: 'Stripe' | 'Dotted' | 'Full';
}

export function generateDeck(): CardType[] {
    const deck: CardType[] = [];

    const shapes: CardType['shape'][] = ['Heart', 'Clover', 'Circle'];
    const colors: CardType['color'][] = ['red', 'green', 'blue'];
    const counts: CardType['count'][] = [1, 2, 3];
    const patterns: CardType['pattern'][] = ['Stripe', 'Dotted', 'Full'];

    shapes.forEach(shape => {
        colors.forEach(color => {
            counts.forEach(count => {
                patterns.forEach(pattern => {
                    deck.push({
                        id: `${shape}-${color}-${count}-${pattern}`,
                        shape,
                        color,
                        count,
                        pattern
                    });
                });
            });
        });
    });

    return shuffleDeck(deck);
}


function shuffleDeck(deck: CardType[]): CardType[] {
    return [...deck].sort(() => Math.random() - 0.5);
}

export function isValidSet(cards: CardType[]): boolean {
    if (cards.length !== 3) return false;

    const isShapeValid = allSameOrAllDifferent(cards.map(c => c.shape));
    const isColorValid = allSameOrAllDifferent(cards.map(c => c.color));
    const isCountValid = allSameOrAllDifferent(cards.map(c => c.count));
    const isFillValid = allSameOrAllDifferent(cards.map(c => c.pattern));

    return isShapeValid && isColorValid && isCountValid && isFillValid;
}

function allSameOrAllDifferent<T>(values: T[]): boolean {
    const uniqueValues = new Set(values);
    return uniqueValues.size === 1 || uniqueValues.size === values.length;
}

export function hasValidSet(cards: CardType[]): boolean {
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            for (let k = j + 1; k < cards.length; k++) {
                if (isValidSet([cards[i], cards[j], cards[k]])) {
                    return true;
                }
            }
        }
    }
    return false;
}
