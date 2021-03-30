import { NextPage } from 'next';
import styled from 'styled-components';
import { m } from 'framer-motion';

import { InfoPageData } from 'types';
import { useGlobalContext } from 'api/globalContext';
import { Main as MainBase } from 'components/Main';
import { ArticleBody } from 'components/ArticleBody';
import { Banner } from 'components/Banner';
import { Line } from 'components/Line';
import { itemTransitionUp } from 'components/transitionConfigs';

export const Info: NextPage<InfoPageData> = ({ background_banner, main_logo, translations }) => {
  const { language } = useGlobalContext();
  const { page_title, body } = translations[language];

  return (
    <Main>
      <Banner bannerUrl={background_banner} logoUrl={main_logo} decorative />

      <Article initial="initial" animate="enter" variants={itemTransitionUp}>
        <h1>{page_title}</h1>
        <Line variant="long" />
        <Contents dangerouslySetInnerHTML={{ __html: body }} />
      </Article>
    </Main>
  );
};

const Main = styled(MainBase)`
  justify-items: center;
`;

const Article = styled(m(ArticleBody))`
  border-radius: var(--border-radius-small);
  margin-top: var(--below-banner-offset);
  padding: var(--article-padding);
`;

const Contents = styled.div`
  * + * {
    margin-top: var(--spacing-regular);
  }
  h2 {
    margin-top: var(--spacing-large);
  }
`;
