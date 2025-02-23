import React from 'react';
import { cn } from '../utils/utils.ts';
import { CardType } from '../utils/Game.ts';
import SvgPatternShape from "./SvgPatternShape.tsx";

import HeartShape from '../assets/Heart.svg?react';
import CloverShape from '../assets/Clover.svg?react';
import CircleShape from '../assets/Circle.svg?react';

import StripesPattern from "../assets/Stripe.svg?react";
import DottedPattern from "../assets/Dotted.svg?react";
import FullPattern from "../assets/Full.svg?react";

interface CardProps {
    card: CardType;
    isSelected: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isSelected, onClick }) => {
    const getShapeComponent = () => {
        switch (card.shape) {
            case 'Heart':
                return HeartShape;
            case 'Clover':
                return CloverShape;
            case 'Circle':
                return CircleShape;
        }
    };

    const getPatternComponent = () => {
        switch (card.pattern) {
            case 'Stripe':
                return StripesPattern;
            case 'Dotted':
                return DottedPattern;
            case 'Full':
                return FullPattern;
        }
    };

    return (
        <div className="w-[calc(25%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]">
            <div className={cn("relative flex flex-col justify-between p-4 bg-white border border-gray-300 shadow-lg h-52 w-72 rounded-xl",
                isSelected && "ring-4 ring-blue-500 ring-offset-2")}
                onClick={onClick}>
                <div className="flex items-center justify-center flex-grow">
                    {[...Array(card.count)].map(() => (
                        <SvgPatternShape shape={getShapeComponent()} pattern={getPatternComponent()} color={card.color} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Card;