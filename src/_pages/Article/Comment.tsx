import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';
import { AnimatePresence, m } from 'framer-motion';

import { Comment as CommentType } from 'types';
import { useGlobalContext } from 'api/globalContext';
import { CommentForm } from '_pages/Article/CommentForm';
import { itemTransitionDown } from 'components/transitionConfigs';
import { getProductionAssetUrl } from 'utils/getProductionAssetUrl';

type CommentProps = {
  comment: CommentType;
};

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { commonData } = useGlobalContext();

  return (
    <Wrapper>
      <Profile>
        <Photo>
          <img src={getProductionAssetUrl(commonData.user_default_picture)} alt="" />
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
            <AnimatePresence>
              {comment.subcomments.map((comment) => (
                <m.li key={comment.id} variants={itemTransitionDown} layout="position">
                  <Comment comment={comment} key={comment.id} />
                </m.li>
              ))}
            </AnimatePresence>
          </Subcomments>
        )}
        {!comment.parent_comment && (
          <CommentForm articleId={comment.article} parentComment={comment.id} />
        )}
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

  padding: var(--spacing-small);

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
