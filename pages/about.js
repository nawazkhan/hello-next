import Layout from "../components/MyLayout";

export default function About() {
  return (
    <Layout>
      <AboutPageContent />
    </Layout>
  );
}

const AboutPageContent = () => <div>This is an about page!!</div>;
