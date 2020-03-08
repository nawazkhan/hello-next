import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";

import useSWR from "swr";
import { useRouter } from "next/router";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

const Index = props => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    `/api/randomQuote${query.author ? "?author=" + query.author : ""}`,
    fetcher
  );

  const author = data?.author;

  let quote = data?.quote;

  if (!data) {
    quote = "Loading...";
  }

  if (error) {
    quote = "Failed to fetch the quote.";
  }

  return (
    <Layout>
      <div>
        <h1>My Blog</h1>
        <ul>
          {props.shows.map(show => (
            <li key={show.id}>
              <Link href="/post/[id]" as={`/post/${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Markdown
          source={`
          This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
        `}
        />
      </div>
      <main className="center">
        <div className="quote">{quote}</div>
        {author && <span className="author">- {author}</span>}
      </main>
      <style jsx>{`
        h1,
        a {
          font-family: "Arial";
        }
        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }

        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
          text-align: center;
        }
        .quote {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
      <style jsx global>{`
        .markdown {
          font-family: "Arial";
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const result = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await result.json();

  console.log(`show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
