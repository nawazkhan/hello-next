const Content = props => {
  const { id, name, summary, image } = props;
  return (
    <div>
      <h1>{name}</h1>
      <p>{summary.replace(/<[/]?[pb]>/g, "")}</p>
      {image ? <img src={image.medium} /> : null}
    </div>
  );
};

export default Content;
