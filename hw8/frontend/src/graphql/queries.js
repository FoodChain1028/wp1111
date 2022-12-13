import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query findChatBox($name1: String!, $name2: String!) {
        name,
        messages {
          sender, 
          body
        }
    }
`;