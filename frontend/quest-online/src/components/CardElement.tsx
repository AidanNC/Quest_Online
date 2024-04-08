import {
	BsFillSuitDiamondFill,
	BsFillHeartFill,
	BsFillSuitSpadeFill,
	BsFillSuitClubFill,
} from "react-icons/bs";
import { GiSnakeSpiral } from "react-icons/gi";
import React from "react";
import styled from "styled-components";

const Div = styled.div`
	height: 50px;
	width: 30px;
	background-color: pink;
	border-radius: 3px;
	display: flex;
	margin: 2px;
	cursor: pointer;
`;

interface CardElementProps {
	suit: string;
	name: string;
	id?: string;
	faceDown?: boolean;
	onClick?: () => void;
}

const CardElement: React.FC<CardElementProps> = ({
	suit,
	name,
	id,
	faceDown,
	onClick,
}) => {
	let displaySuit: JSX.Element = <BsFillSuitClubFill color="black" />;
	if (suit === "D") {
		displaySuit = <BsFillSuitDiamondFill color="red" />;
	} else if (suit === "H") {
		displaySuit = <BsFillHeartFill color="red" />;
	} else if (suit === "S") {
		displaySuit = <BsFillSuitSpadeFill color="black" />;
	} else if (suit === "C") {
		displaySuit = <BsFillSuitClubFill color="black" />;
	}
	return (
		<Div
		id={"card" + id}
			onClick={() => {
				if (onClick !== undefined) {
					onClick();
				}
			}}
		>
			{!faceDown && (
				<>
					<p>{displaySuit}</p>
					<p>{name}</p>
				</>
			)}
			{faceDown && <GiSnakeSpiral />}
		</Div>
	);
};

export default CardElement;
