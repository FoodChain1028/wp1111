import styled from 'styled-components';
import { Tag } from 'antd';

const StyledMessage = styled.div`
    display: flex;
    align-center: center;
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 0px;

    & p:first-child {
        margin: 0 5px;
    }

    & p:last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;

const Message = ({ name, isMe, message, key }) => {
    console.log(name, isMe, message, key)
    return(
        <StyledMessage >
            <p key={key}>
                <Tag color='blue'> { name } </Tag> 
                {message}
            </p>
        </StyledMessage>
    )
}

export default Message;