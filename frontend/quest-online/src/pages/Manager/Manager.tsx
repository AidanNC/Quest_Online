import Join from "../Join/Join";
import Game from "../Game/Game";
import { useState, useEffect, createContext } from "react";

const socket = new WebSocket("ws://192.168.4.21:8070"); //chanage this all the time

import Card from "../../types/Card";

type Opponent = {
	bet: number;
	wonTricks: Card[][];
	score: number;
	active: boolean;
	cardsInHand: number;
    playedCard: Card | null;
};

interface Info {
	hand: Card[];
	trumpCard: Card;
	playerBet: number;
	playerWonTricks: Card[][];
	currTrick: Card[];
	playerScore: number;
	active: boolean;
    playedCard: Card | null;
    opponents: Opponent[];
}

export const InfoContext = createContext<Info | null>(null);

const Manager = () => {
	const [playerID, setPlayerID] = useState<string | null>(localStorage.getItem('playerID'));
    // const [playerID, setPlayerID] = useState<string | null>(null);
	const [info, setInfo] = useState<Info | null>(null);
    const [rejoin, setRejoin] = useState<boolean>(localStorage.getItem('playerID') !== null);

	function handleMessage(event: MessageEvent) {
		console.log("Message from server ", event.data);

		const data = JSON.parse(event.data);
		if (data.userID !== undefined) {
			setPlayerID(data.userID);
            localStorage.setItem('playerID', data.userID);
		}
		if (data.info !== undefined) {
			setInfo(data.info);
		}
	}



	useEffect(() => {
		// socket.addEventListener("message", (event) => {
		//     handleMessage(event);
		// });
		socket.addEventListener("message", handleMessage);
		console.log("Adding event listener");


		return () => socket.removeEventListener("message", handleMessage);
	}, []);

	return (
		<InfoContext.Provider value={info}>
			<>
				<p>PlayerID: {playerID}</p>
				{(playerID === null || rejoin) && (
                    <>
                    <p>Join</p>
					<Join
						setPlayerID={() => {

                            if(rejoin){
                                socket.send(JSON.stringify({ join: true, playerID: playerID }));
                                setRejoin(false);
                                alert("Welcome BACK to the game!");
                            }else{
                                socket.send(JSON.stringify({ join: true }));
                                alert("Welcome to the game!");
                            }
							
						}}
					/>
                    </>
				)}
				{playerID !== null && !rejoin && (
					<Game
						makeBet={(bet: number) => {
							console.log(bet);
							socket.send(JSON.stringify({ bet, playerID }));
						}}
					></Game>
				)}
			</>
		</InfoContext.Provider>
	);
};

export default Manager;
