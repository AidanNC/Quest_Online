import React from "react";
import styled from "styled-components";
import CardElement from "../CardElement";

const HEIGHT = 120;

const MainDiv = styled.div`
	height: ${HEIGHT}px;
	width: 600px;
	border-radius: 3px;
	display: flex;
	margin: 2px;
	border: 1px solid black;
`;
const Pfp = styled.div<{ $active?: boolean; }>`
	height: ${HEIGHT}px;
	width: ${HEIGHT}px;
	border-radius: 3px;
	background: ${props => props.$active ? "yellow" : "blue"};
`;
const Hand = styled.div`
	height: 80px;
	width: 100%;
    display:flex;
    justify-content: left;
    align-items: center;
`;
const Attributes = styled.div`
	height: 40px;
	width: 100%;
    display:flex;
    justify-content: space-around;
`;

interface OpponentRackProps {
	score: number;
	bet: number;
	wonTricks: number;
    handSize: number;
    active: boolean;
}


const OpponentRack: React.FC<OpponentRackProps> = ({score,bet,wonTricks,handSize,active}) => {

	return (
		<MainDiv>
			<Pfp $active={active}/>
			<div style={{ display: "flex", flexDirection: "column", width:"100%"}}>
				<Attributes>
                    <p>Score: {score}</p>
                    <p>Bet: {bet}</p>
                    <p>Won Tricks: {wonTricks}</p>
                </Attributes>
				<Hand>
                    {Array.from({length: handSize}, (_, index) => {
                        return (
                            <CardElement key={index} suit={"S"} name={"2"} faceDown={true}/>
                        );
                    })}
                </Hand>
			</div>
		</MainDiv>
	);
};

export default OpponentRack;