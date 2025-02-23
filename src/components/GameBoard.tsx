import { useEffect, useState } from 'react';
import Card from './Card.tsx';
import { ScoreBoard } from './ScoreBoard.tsx';
import * as GameTs from '../utils/Game.ts';
import toast from 'react-hot-toast';
import { formatTime } from '../utils/utils.ts';

export function GameBoard() {
    const [deck, setDeck] = useState<GameTs.CardType[]>([]);
    const [displayedCards, setDisplayedCards] = useState<GameTs.CardType[]>([]);
    const [selectedCards, setSelectedCards] = useState<GameTs.CardType[]>([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
    const [showAddCardsButton, setShowAddCardsButton] = useState(false);
    const [finalTime, setFinalTime] = useState<number | null>(null);


    useEffect(() => {
        let timer: number;
        if (isGameActive) {
            timer = window.setInterval(() => {
                setTimeElapsed(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isGameActive]);

    useEffect(() => {
        if (!isGameActive) return;

        const checkInactivity = setInterval(() => {
            if (Date.now() - lastInteractionTime >= 10000 && deck.length >= 3) {
                setShowAddCardsButton(true);
            }
        }, 1000);

        return () => clearInterval(checkInactivity);
    }, [lastInteractionTime, isGameActive]);

    const startGame = () => {
        const newDeck = GameTs.generateDeck();
        setDeck(newDeck.slice(12));
        setDisplayedCards(newDeck.slice(0, 12));
        setSelectedCards([]);
        setTimeElapsed(0);
        setIsGameActive(true);
        setLastInteractionTime(Date.now());
        setShowAddCardsButton(false);
    };

    const handleCardClick = (card: GameTs.CardType) => {
        if (!isGameActive) return;

        setLastInteractionTime(Date.now());
        setShowAddCardsButton(false);

        setSelectedCards(prev => {
            const isSelected = prev.some(c => c.id === card.id);
            if (isSelected) {
                return prev.filter(c => c.id !== card.id);
            }
            if (prev.length < 3) {
                const newSelected = [...prev, card];
                if (newSelected.length === 3) {
                    checkSet(newSelected);
                    return [];
                }
                return newSelected;
            }
            return prev;
        });
    };

    const checkSet = (cards: GameTs.CardType[]) => {
        if (GameTs.isValidSet(cards)) {
            let newDisplayedCards = [...displayedCards];

            // Ne rajoute pas de cartes si plus de 12 sont déjà affichées
            if (deck.length >= 3 && displayedCards.length <= 12) {
                const newCards = deck.slice(0, 3);
                setDeck(deck.slice(3));

                newDisplayedCards = newDisplayedCards.map(card =>
                    cards.some(c => c.id === card.id) ? newCards.pop()! : card
                );
            }
            else {
                // Supprime simplement les cartes validées si > 12 cartes sur le terrain
                newDisplayedCards = newDisplayedCards.filter(
                    card => !cards.some(c => c.id === card.id)
                );
            }

            setDisplayedCards(newDisplayedCards);

            // Vérifie si la partie est terminée (plus de cartes sur le plateau et dans le deck)
            if (newDisplayedCards.length === 0 && deck.length === 0) {
                setIsGameActive(false);
                setFinalTime(timeElapsed);
                toast.success("Partie terminée !");
            } else if (!GameTs.hasValidSet(newDisplayedCards) && deck.length === 0) {
                setIsGameActive(false);
                setFinalTime(timeElapsed);
                toast.success("Partie terminée ! Aucun set disponible.");
            } else {
                toast.success('Set! valide !');
            }
        }
        else {
            toast.error('Set! invalid ! +5s.');
            setTimeElapsed(t => t + 5);
        }
    };

    const addThreeCards = () => {
        if (deck.length < 3) {
            toast.error("Pas assez de cartes dans le deck !");
            return;
        }

        if (GameTs.hasValidSet(displayedCards)) {
            toast.error('Un Set! était possible ! +5s.');
            setTimeElapsed(t => t + 5);
        }

        setDisplayedCards(prev => [...prev, ...deck.slice(0, 3)]);
        setDeck(deck.slice(3));
        setShowAddCardsButton(false);
        setLastInteractionTime(Date.now());
    };

    return (
        <>
            <div className="container px-4 py-8 mx-auto">
                {isGameActive && <ScoreBoard timeElapsed={timeElapsed} />}

                <div className="flex justify-center mb-8">
                    <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={startGame}
                    >
                        {isGameActive ? "Restart Game" : "Start Game"}
                    </button>
                </div>

                {finalTime !== null && (
                    <div className="flex justify-center mt-4">
                        <p className="text-xl font-bold text-gray-700">
                            Temps final : {formatTime(finalTime)}
                        </p>
                    </div>
                )}


                <div className="flex flex-wrap justify-center gap-4">
                    {displayedCards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            isSelected={selectedCards.some(c => c.id === card.id)}
                            onClick={() => handleCardClick(card)}
                        />
                    ))}
                </div>

                {showAddCardsButton && (
                    <div className="flex justify-center mt-6">
                        <button
                            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                            onClick={addThreeCards}
                        >
                            Ajouter 3 cartes
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
