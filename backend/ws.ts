import WebSocket, { WebSocketServer } from "ws";
import Game from "./GameServices/GameManager";

const wss = new WebSocketServer({ port: 8070 });

console.log("Starting Server!");
let playerCount = 0;
const MAX_PLAYERS = 3;

const randomID = () => {
  return Math.floor(Math.random() * 1000).toString();
};


const playerIDs = [randomID(), randomID(), randomID()];
const sockets: WebSocket[] = [];

//basic gameplay
const game = new Game(MAX_PLAYERS);
game.startRound(3, 0);

const getAndSendInfo = (client: WebSocket) => {
  const gameInfo = game.generateInfo(sockets.indexOf(client));
  const message = JSON.stringify({info: gameInfo });
  console.log("sending");
  client.send(message);
};

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", function message(data) {
		console.log(data.toString());
		const jsonData = JSON.parse(data.toString());
		if (jsonData.join !== undefined) {
			console.log("Joining!");
      console.log(playerIDs);
      console.log(jsonData.playerID);
      console.log(playerIDs.includes(jsonData.playerID));
      if(jsonData.playerID !== undefined && playerIDs.includes(jsonData.playerID)){
          console.log(jsonData.playerID + " Rejoined!");
          sockets[playerIDs.indexOf(jsonData.playerID)] = ws; //have to update the socket connection
          getAndSendInfo(ws);
      }
			else if(playerCount < MAX_PLAYERS) {
				playerCount++;
				//will need more logic if clients disconnect and reconnect but for now this should work
				sockets.push(ws); //so we know who to notify
				const response = JSON.stringify({ userID: playerIDs[playerCount - 1] });
        console.log("response: " + response);
				ws.send(response);
        getAndSendInfo(ws);
			}else{
        console.log("Game full, join rejected!");
      }
		} else if (playerIDs.includes(jsonData.playerID)) {
			//only let them bet if they are part of the game
			if (jsonData.bet !== undefined) {
				console.log("Bet!");
				const playerIndex = playerIDs.indexOf(jsonData.playerID);
				const action = jsonData.bet;
				const result = game.processAction(playerIndex, action);

				if (result === 1) {
					sockets.forEach(function each(client) {
						getAndSendInfo(client);
					});
				}
			}
		}
	});
});
