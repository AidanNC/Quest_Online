import styled from "styled-components";
import React from "react";
import CenteredContainer from "../../Styles/CenteredContainer";
const COLOR = "#19114f";

const Button = styled.button`
	color: ${COLOR};
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid ${COLOR};
	border-radius: 3px;
	cursor: pointer;
	background-color: #f781de;
`;

const Paragraph = styled.p`
	color: ${COLOR};
	font-size: 1em;
`;

const NotificationWindow = styled.div`
	border: 1px solid ${COLOR};
	display: flex;
	flex-direction: column;
	justify-content: center;
`;



interface JoinProps {
	setPlayerID: () => void;
}

const Join: React.FC<JoinProps> = ({ setPlayerID }) => {
	return (
		<CenteredContainer>
			<NotificationWindow>
				<Paragraph>Click to join the game!</Paragraph>
				<Button
					onClick={() => {
						setPlayerID();
					}}
				>
					Join
				</Button>
			</NotificationWindow>
		</CenteredContainer>
	);
};

export default Join;
