import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

import { Comment as CommentType } from 'types';
import { CommentForm } from '_pages/Article/CommentForm';

type CommentProps = {
  comment: CommentType;
};

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Wrapper>
      <Profile>
        <Photo>
          <FiUser />
        </Photo>
        <Info>
          <Name>{`${comment.user_created.first_name} ${comment.user_created.last_name}`}</Name>
          <Datetime dateTime={comment.date_created}>
            {new Date(comment.date_created).toLocaleString('fi-FI', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Datetime>
        </Info>
      </Profile>

      <Contents>
        <div dangerouslySetInnerHTML={{ __html: comment.body }} />
        {comment.subcomments && !comment.parent_comment && (
          <Subcomments>
            {comment.subcomments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </Subcomments>
        )}
        {!comment.parent_comment && (
          <CommentForm articleId={comment.article} parentComment={comment.id} />
        )}
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  --image-size: 3rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
`;

const Photo = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--image-size);
  height: var(--image-size);
  background-color: var(--gray-lighter);
  font-size: 1.5em;

  border-radius: 999px;
`;

const Info = styled.div`
  margin-left: var(--spacing-regular);
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 1.25em;
`;

const Datetime = styled.time`
  color: var(--gray-light);
`;

const Contents = styled.div`
  margin-left: calc(var(--image-size) / 2);
  border-left: 1px solid currentColor;
  padding-left: calc(var(--image-size) / 2 + var(--spacing-regular) - 1px);

  & > * + * {
    margin-top: var(--spacing-medium);
  }

  color: var(--gray-dark);
`;

const Subcomments = styled.ol`
  & > * + * {
    margin-top: var(--spacing-medium);
  }
`;
