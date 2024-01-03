/* eslint-disable react/no-danger */
import { FC, ReactElement } from 'react';
import EmptyImg from '@/assets/images/empty.png';
import { CenteredEmptyContentWrapper, EmptyContentWrapper } from './NoContent.style';
import { INoContentProps } from './interfaces';

const NoContent: FC<INoContentProps> = ({ textContent }): ReactElement => {
  const createMarkup = () => ({ __html: textContent });

  return (
    <CenteredEmptyContentWrapper>
      <EmptyContentWrapper>
        <img src={EmptyImg} alt="empty" />
        <p dangerouslySetInnerHTML={createMarkup()} />
      </EmptyContentWrapper>
    </CenteredEmptyContentWrapper>
  );
};

export { NoContent };
