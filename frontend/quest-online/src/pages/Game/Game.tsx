import styled from "styled-components";
import React, { useState, useContext } from "react";
import { InfoContext } from "../Manager/Manager";
import OpponentRack from "../../components/Rack/OpponentRack";
import PlayerRack from "../../components/Rack/PlayerRack";
import CardElement from "../../components/CardElement";
import CanvasDrawer from "./CanvasFunctions/CanvasDrawer";


const HEIGHT = 600;
const WIDTH = 800;
const Input = styled.input`
	defaultvalue: "0";
	label: "Bet";
`;
const Button = styled.button`
	color: #19114f;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #19114f;
	border-radius: 3px;
	cursor: pointer;
	background-color: #f781de;
`;
const Canvas = styled.canvas`
	border: 1px solid pink;
	width: 100%;
	height: 100%;
	position: absolute;
	pointer-events: none;
`;
const MainDiv = styled.div`
	background: #c7fcd6;
	position: relative;
	height: ${HEIGHT}px;
	width: ${WIDTH}px;
`;


interface GameProps {
	makeBet: (bet: number) => void;
}

const Game: React.FC<GameProps> = ({ makeBet }) => {
	const [bet, setBet] = useState(0);
	const info = useContext(InfoContext);
	const [canvasDrawer, setCanvasDrawer] = useState<CanvasDrawer | null>(null);

	const makeUIBet = (bet: number, element: HTMLElement) => {
		makeBet(bet);
		canvasDrawer?.drawDot(element.offsetLeft, element.offsetTop);
	};

	React.useEffect(() => {
		const c = document.getElementById("canvas") as HTMLCanvasElement;
		setCanvasDrawer(new CanvasDrawer(HEIGHT, WIDTH, c));
	}, []);
	
	return (
		<MainDiv>
			<Canvas
			id="canvas"
			>
				
			</Canvas>
			<Input
				onChange={(e) => {
					setBet(parseInt(e.target.value));
				}}
				type="number"
				min={0}
			></Input>
			<Button
				onClick={() => {
					makeBet(bet);
				}}
			>
				SubmitBet
			</Button>
			<p>Trump Card:</p>
			{info && (<CardElement suit={info.trumpCard.suit} name={info.trumpCard.name}/>)}
			{info && (
				<div style={{display:"flex"}}>
					<PlayerRack score={info.playerScore} bet={info.playerBet} wonTricks={info.playerWonTricks.length} hand={info.hand} makeBet={makeBet} makeUIBet={makeUIBet} active={info.active}/>
					{info.playedCard && <CardElement suit={info.playedCard.suit} name={info.playedCard.name}/>}
				</div>
				

			)
		}
			{info && (
				info.opponents.map((opponent, index) => {
					return (
						<div style={{display:"flex"}}>
						<OpponentRack key={index} score={opponent.score} bet={opponent.bet} wonTricks={opponent.wonTricks.length} handSize={opponent.cardsInHand} active={opponent.active}/>
						{opponent.playedCard && <CardElement suit={opponent.playedCard.suit} name={opponent.playedCard.name}/>}
						</div>
						
					);
				}
			))}
		</MainDiv>
	);
};

export default Game;
