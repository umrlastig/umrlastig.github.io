import React from "react";
import { useLocalization } from "@ericcote/gatsby-theme-i18n";
import {
  NewsList,
  NewsArticleDate,
  NewsArticleContent,
} from "./styles/News.styled_";

export const NewsArticle = ({ id, date, team, text }) => {
  return (
    <div key={`${id}-news-article`}>
      <NewsArticleDate team={team} key={`${id}-date`}>
        <b>{date}</b>
      </NewsArticleDate>
      <div key={`${id}-sep`} />
      <NewsArticleContent key={`${id}-content`}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </NewsArticleContent>
    </div>
  );
};
export const News = ({ data }) => {
  const { locale } = useLocalization();

  return (
    <div key="News">
      <h3 key="News-title">{locale === "en" ? "News" : "Actualités"}</h3>
      <NewsList>
        {data.allNewsCsv.nodes.map((node) =>
          // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.date} [${node.team}]:</b> ${(locale === 'en') ? node.texten : node.textfr}` }}></article>
          <NewsArticle
            id={node.id}
            date={node.date}
            team={node.team}
            text={locale === "en" ? node.texten : node.textfr}
            key={node.id}
          />
        )}
      </NewsList>
    </div>
  );
};
