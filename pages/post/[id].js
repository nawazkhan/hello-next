import Layout from "../../components/MyLayout";
import Content from "../../components/Content";

import fetch from "isomorphic-unfetch";

const Post = props => {
  return (
    <Layout>
      <Content {...props} />
    </Layout>
  );
};

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const result = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await result.json();

  console.log(`Fetched show: ${show.name}`);

  return show;
};

export default Post;
