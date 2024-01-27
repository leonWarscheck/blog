
export const mdxComponents = {
  h1: ({ children }) => <h1 className="text-xl font-semibold">{children}</h1>,
  img: (props) => (
    <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...props} />
  ),
  p: ({ children }) => <p className="pb-4">{children}</p>,
};



