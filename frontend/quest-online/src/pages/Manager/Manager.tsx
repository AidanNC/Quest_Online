import Join from "../Join/Join";
import Game from "../Game/Game";
import { useState, useEffect, createContext, useRef } from "react";

const socket = new WebSocket("ws://192.168.4.21:8070"); //chanage this all the time

import Card from "../../types/Card";

import GameManager from "../../../../../backend/GameServices/GameManager.ts";

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
    const [singlePlayer, setSinglePlayer] = useState<boolean>(false);
    // const [spGame, setSpGame] = useState<GameManager>(new GameManager(3));
    const spGameRef = useRef(new GameManager(3));
    const spGame = spGameRef.current;


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

    function setSPInfo(){
        console.log("Setting SP Info");
        console.log(spGame.hands);
        const newInfo = spGame.generateInfo(0);
        if(newInfo !== -1){
            console.log(newInfo);
            setInfo(newInfo);
        }
    }
    async function playCPUTurns(){
        //make a random bet for each cpu]
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        
        for(let j = 0; j < 2; j ++){
            for(let i = 1; i < 3; i++){
        
                await sleep(1000);
    
                if(spGame.betting){
                    spGame.processAction(i,spGame.getRandomBet(i));
                    // spGame.processAction(i,2);
                    
                }else{
                    spGame.processAction(i, spGame.getRandomPlay(i));
                    // spGame.processAction(i, 2);
                }
               
                
                setSPInfo();   
            }
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
				{(playerID === null || rejoin) && (!singlePlayer) && (
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
                        playSinglePlayer={() => {
                            console.log("play single player");
                            setSinglePlayer(true);
                            // setSpGame(new GameManager(3));
                            spGame.startRound(3,2);
                            setSPInfo();
                            console.log("play turns 1");
                            playCPUTurns();
                            

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
                {singlePlayer && (
                    <Game
                    makeBet={(bet: number) =>{
                        console.log("betting: " + bet);
                        console.log("A");
                        console.log(spGame.hands);
                        // we will have the player be index 0 always
                        const result = spGame.processAction(0, bet);
                        console.log("B");
                        console.log(spGame.hands);
                        if(result === 1){
                            setSPInfo();

                        }
                        playCPUTurns();
                    
                    }}
                    >

                    </Game>
                )}
			</>
		</InfoContext.Provider>
	);
};

export default Manager;
