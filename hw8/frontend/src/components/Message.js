import styled from "styled-components";
import { Tag } from 'antd';

// if the message is long, change the width of the message box
const StyleMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 0px;

    & p:first-child{
        margin: 0 5px;
    }

    & p:last-child{
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: grey;
        margin: auto 0;
    }

    & p{
        max-width: 100px;
        overflow-wrap: break-word;
    }
`;

const Message = ({ name, isMe, message } ) => {
    return (
        <StyleMessage isMe={isMe}>
            <p>
                {/* <Tag color="blue">{name}</Tag> */}
                {message}
            </p>
        </StyleMessage>

    );
};

export default Message;