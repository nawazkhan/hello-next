import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";

const Index = props => {
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
