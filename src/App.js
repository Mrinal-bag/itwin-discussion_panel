import { useQuery, gql } from "@apollo/client";
import TableData from "./TableData";
import "./App.css";
import {Table}  from "./Table";
import { end } from "./Table";
import { useState } from "react";
let strtCur = [];
let i=-1;

// const GET_POSTS = gql`
//   query {
//     repository(owner: "iTwin", name: "itwinjs-core") {
//       discussions(first: 100, after:cursor,orderBy: { field: CREATED_AT, direction: DESC }) {
//         nodes {
//           DiscussionUrl: url
//           title
//           author {
//             Authorusername: login
//             AuthorGithubUrl: url
//           }
//           updatedAt
//           createdAt
//           category {
//             categoryName: name
//           }
//           answer {
//             author {
//               DeveloperAnswered: login
//               DeveloperAnsweredGithubUrl: url
//             }
//             AnswerCreatedAt: createdAt
//             AnswerUrl: url
//           }
//           comments(last: 1) {
//             totalCount
//             nodes {
//               author {
//                 DeveloperReplied: login
//                 DeveloperRepliedGithubUrl: url
//               }
//               DeveloperReplyUrl: url
//             }
//           }
//         }
//       }
//     }
//   }
// `;
//function DisplayLocations() {
  // const { loading, error, data } = useQuery(GET_LOCATIONS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error...</p>;
  // console.log(data);
  // let arr = data.repository.discussion.node.map((item)=>item);



//  return data.repository.discussions.nodes.map(
//     (
//       { DiscussionUrl, title, createdAt, answer, comments, updatedAt },
//       index
//     ) => (
//       <div style={{ margin: "20px" }}>
//         <h3
//           style={{
//             display: "inline",
//             margin: "20px",
//           }}
//         >
//           {index + 1}.
//         </h3>
//         <a
//           style={{
//             width: "100%",
//             maxWidth: "400px",
//             display: "inline-block",
//             color:
//               answer != null
//                 ? "Green"
//                 : comments.totalCount != 0
//                 ? "orange"
//                 : "red",
//           }}
//           href={DiscussionUrl}
//           target="_blank"
//         >
//           {title}
//         </a>
//         <p
//           style={{
//             display: "inline-block",
//             width: "100%",
//             maxWidth: "250px",
//           }}
//         >
//           {createdAt.toString().substring(0, 10)}
//         </p>
//         <p
//           style={{
//             display: "inline-block",
//             maxWidth: "250px",
//             width: "100%",
//           }}
//         >
//           {updatedAt.toString().substring(0, 10)}
//         </p>
//         <p
//           style={{
//             display: "inline-block",
//             maxWidth: "250px",
//             width: "100%",
//             color: comments.totalCount >= 4 ? "Orange" : "Black",
//           }}
//         >
//           {comments.totalCount}
//         </p>
//       </div>
//     )
//   );
//}

export default function App() {
  const [cursor,setCursor] = useState("Y3Vyc29yOnYyOpK5MjAyMi0xMC0wM1QxMTo1ODo1NiswNTozMM4AQ8EV");
  const [login,setLogin] = useState(true)
  const { loading, error, data } = useQuery(gql`
  query {
    repository(owner: "iTwin", name: "itwinjs-core") {
      discussions(first:5, after:"${cursor}", orderBy: { field:CREATED_AT, direction: DESC }) {
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
  //console.log(data);
  //let arr = data.repository.discussion.node.map(({item})=>item);
  //console.log(arr);
  function updateCursor(){
    i=i+1;
    if(i==0){
      strtCur.push(end);
      setCursor(end);
    }
    else{
      strtCur.push(data.repository.discussions.pageInfo.endCursor);
      // alert(strtCur);
      //alert(data.repository.discussions.pageInfo.endCursor);
      setCursor(data.repository.discussions.pageInfo.endCursor);
    }

    setLogin(false)
  }
  function backCursor(){

    i=i-1;
    if(i<0){
      setLogin(true);
      i=-1;
    }
    else{
    setCursor(strtCur[i]);
    }
    
  }
  //console.log(data.repository.discussions.pageInfo.startCursor);
  let list = data.repository.discussions.nodes.map((x)=> <TableData value={x}/>);
  return (
    <div className="App">
               <h1>Itwins Discussion</h1>
               <hr style={{align:"left"}}></hr>
                <div>
                    <table border="0">
                        <th><div className="Tbdy">Discussion Link</div></th>
                        <th><div className="Tbdy">Creation Date</div></th>
                        <th><div className="Tbdy">Updated Date</div></th>
                        <th><div className="Tbdy">Total Replies</div></th>
                    </table>
                    {login?<Table/>:<table border="0"><tbody>{list}</tbody></table>}
                    <button className="btn" onClick={backCursor}>Previous</button>
                    <button className="btn" onClick={updateCursor}>Next</button>
                </div>
    </div>
  );
}