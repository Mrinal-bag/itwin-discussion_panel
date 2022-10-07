import React from 'react'
import TableData from "./TableData";
import { useQuery, gql } from "@apollo/client";
export let end;
export function Table() {
    const { loading, error, data } = useQuery(gql`
    query {
        repository(owner: "iTwin", name: "itwinjs-core") {
          discussions(first:5, orderBy: { field:CREATED_AT, direction: DESC }) {
            pageInfo{
              hasNextPage
               hasPreviousPage
               startCursor
               endCursor
            }
            nodes {
              DiscussionUrl: url
              title
              author {
                Authorusername: login
                AuthorGithubUrl: url
              }
              updatedAt
              createdAt
              category {
                categoryName: name
              }
              answer {
                author {
                  DeveloperAnswered: login
                  DeveloperAnsweredGithubUrl: url
                }
                AnswerCreatedAt: createdAt
                AnswerUrl: url
              }
              comments(last: 1) {
                totalCount
                nodes {
                  author {
                    DeveloperReplied: login
                    DeveloperRepliedGithubUrl: url
                  }
                  DeveloperReplyUrl: url
                }
              }
            }
          }
        }
      }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <h2>Error...</h2>;
    let list = data.repository.discussions.nodes.map((x)=> <TableData value={x}/>);
    end = data.repository.discussions.pageInfo.endCursor;
    //console.log(end);
  return (
    <div>
      <table  border="0">
         <tbody >
              {list}
        </tbody>
     </table>
    </div>
  )
}
