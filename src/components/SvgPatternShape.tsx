import React, { useId } from "react";

interface SvgPatternShapeProps {
    shape: React.FC<React.SVGProps<SVGSVGElement>>; // SVG importé en tant que composant
    pattern: React.FC<React.SVGProps<SVGSVGElement>>; // SVG de remplissage
    color: string;
}

const SvgPatternShape: React.FC<SvgPatternShapeProps> = ({ shape: Shape, pattern: Pattern, color }) => {
    const uniqueId = useId();
    return (
        <svg width="50%" height="50%" viewBox="0 0 200 200">
            <defs>
                {/* Masque basé sur la forme */}
                <mask id={`shapeMask-${uniqueId}`}>
                    <rect width="200" height="200" fill="black" />
                    <Shape fill="white" stroke="white" strokeWidth="4" />
                </mask>

                {/* Définition du pattern avec une taille fixe */}
                <pattern id={`fillPattern-${uniqueId}`} patternUnits="userSpaceOnUse" width="200" height="200">
                    <Pattern fill={color} stroke={color} strokeWidth="2" />
                </pattern>
            </defs>

            {/* Fond avec le pattern, limité par le masque */}
            <rect width="200" height="200" fill={`url(#fillPattern-${uniqueId})`} mask={`url(#shapeMask-${uniqueId})`} />

            {/* Contour du cœur */}
            <Shape fill="none" stroke={color} strokeWidth="10" />
        </svg>
    );
};

export default SvgPatternShape;
