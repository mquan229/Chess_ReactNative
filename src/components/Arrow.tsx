import React from "react";
import Svg, { Defs, Line, Marker, Path } from 'react-native-svg';

interface ArrowProps {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
  }

const Arrow : React.FC<ArrowProps> = ({ fromX, fromY, toX, toY }) => {
  return (
    <Svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Defs>
        <Marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <Path d="M0,0 L0,7 L10,3.5 z" fill="red" />
        </Marker>
      </Defs>
      <Line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="red"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </Svg>
  );
};

export default Arrow;
