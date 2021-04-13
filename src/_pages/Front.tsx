import { getFrontPageData } from 'api';
import { useGlobalContext } from 'api/globalContext';
import { Banner } from 'components/Banner';
import { Card, CardList, CardWrapper } from 'components/Card';
import { Line } from 'components/Line';
import { Main as MainBase } from 'components/Main';
import { NextPage } from 'next';
import styled from 'styled-components';
import useSWR from 'swr';
import { Article, FrontPageData } from 'types';

export const Front: NextPage<FrontPageData> = (props) => {
  const { data } = useSWR('frontPageData', getFrontPageData, { initialData: props });
  const { language } = useGlobalContext();
  const {
    background_banner,
    background_banner_narrow,
    background_animation,
    main_logo,
    highlighted_articles,
    translations,
  } = data!;

  const { logo_alternative_text, videos_title, podcasts_title, blog_posts_title } = translations[
    language
  ];

  // TODO: remove
  const mockArticles = highlighted_articles
    .concat(highlighted_articles)
    .concat(highlighted_articles);

  return (
    <Main>
      <Banner
        bannerUrl={background_banner}
        bannerNarrowUrl={background_banner_narrow}
        animationUrl={background_animation}
        logoUrl={main_logo}
        logoText={logo_alternative_text}
      />

      <CardSection articles={mockArticles} type="video" title={videos_title} />

      <CardSection articles={mockArticles} type="podcast" title={podcasts_title} />

      <CardSection articles={mockArticles} type="blog_post" title={blog_posts_title} />
    </Main>
  );
};

type CardSectionProps = {
  articles: Article[];
  type: Article['type'];
  title: string;
};

const CardSection: React.FC<CardSectionProps> = ({ articles, type, title, ...rest }) => (
  <CardSectionWrapper {...rest}>
    <CardSectionTitle>{title}</CardSectionTitle>
    <Line variant="long" />
    <CardList>
      {articles
        .filter((a) => a.type === type)
        .map((article) => (
          <CardWrapper key={article.id}>
            <Card article={article} />
          </CardWrapper>
        ))}
    </CardList>
  </CardSectionWrapper>
);

const Main = styled(MainBase)``;

const CardSectionWrapper = styled.section`
  & + & {
    margin-top: calc(var(--spacing-xlarge) * 1.5);
  }

  & > * + * {
    margin-top: var(--spacing-medium);
  }

  &:first-of-type {
    color: var(--white);
    margin-top: var(--below-banner-offset);
  }
`;

const CardSectionTitle = styled.h2`
  font-size: var(--text-title);
`;
