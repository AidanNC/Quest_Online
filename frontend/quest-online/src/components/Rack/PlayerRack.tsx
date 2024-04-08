import React from "react";
import styled from "styled-components";
import CardElement from "../CardElement";
import Card from "../../types/Card";

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

interface PlayerRackProps {
	score: number;
	bet: number;
	wonTricks: number;
	hand: Card[];
    makeBet: (index: number) => void;
	makeUIBet: (bet: number, element: HTMLElement) => void;
	active: boolean;
}


const PlayerRack: React.FC<PlayerRackProps> = ({score,bet,wonTricks,hand,makeBet,makeUIBet,active}) => {

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
                {hand.map((card, index) => {
							return (
								<CardElement id={index.toString()} key={index} suit={card.suit} name={card.name} 
								onClick={()=>{
									makeBet(index)
									// makeUIBet(index, document.getElementById("card"+index) as HTMLElement);
								}}/>
							);
						})}
                </Hand>
			</div>
		</MainDiv>
	);
};

export default PlayerRack;
