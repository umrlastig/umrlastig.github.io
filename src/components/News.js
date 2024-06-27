import React from 'react'
import { useLocalization } from "@ericcote/gatsby-theme-i18n"
import {NewsList, NewsArticleDate} from './styles/News.styled'

export const NewsArticle = ({id, date, team, text}) => {
    return (
        <div key={id}>
            <NewsArticleDate team = {team} key={`${id}-date`}><b>{date}</b></NewsArticleDate>
            <div key={`${id}-sep`}></div>
            <div key={`${id}-content`}><span dangerouslySetInnerHTML={{__html: text}} /></div>
        </div>
    );
}
export const News = ({data}) => {
    const { locale } = useLocalization()

    return (
        <NewsList>
            {
                data.allNewsCsv.nodes.map((node) => (
                    // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.date} [${node.team}]:</b> ${(locale === 'en') ? node.texten : node.textfr}` }}></article>
                    <NewsArticle id = {node.id} date = {node.date} team = {node.team} text = {(locale === 'en') ? node.texten : node.textfr}/>
                ))
            }
        </NewsList>
    );
}