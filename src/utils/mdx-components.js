export const mdxComponents = {
  h2: ({ children }) => (
    <>
      <h2 className="text-xl font-semibold">{children}</h2>
      <br />
    </>
  ),
  h3: ({ children }) => (
    <>
      <h3 className="font-semibold text-">{children}</h3>
      <br />
    </>
  ),
  p: ({ children }) => (
    <>
      <p className="font-normal ">{children}</p> <br />
    </>
  ),
  hr: ()=> <><hr style={{height: "1.7px", backgroundColor: "white",}}/><br/></>,
  pre: ({children})=> <><pre>{children}</pre></>,
};
// style={{height: "1.5px", backgroundColor: "white" ,}}