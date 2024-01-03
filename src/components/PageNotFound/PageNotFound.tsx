import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import EmptyImg from '@/assets/images/empty.png';
import { CenteredPageNotFoundWrapper, PageNotFoundWrapper } from './PageNotFound.style';

const PageNotFound: FC = (): ReactElement => {
  return (
    <CenteredPageNotFoundWrapper>
      <PageNotFoundWrapper>
        <h1 style={{ color: '#dedede' }}>404</h1>
        <img src={EmptyImg} alt="empty" />
        <p>The page you are looking for is not available.</p>
        <Link to="/">Take me home</Link>
      </PageNotFoundWrapper>
    </CenteredPageNotFoundWrapper>
  );
};

export { PageNotFound };
