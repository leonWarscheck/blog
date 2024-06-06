export function useMDXComponents(components) {
  return {
  
    // h2: ({ children }) => <h2 className="underline text-red-500">{children}</h2>,
    
    // pre: ({children})=> <pre>{children}</pre>,

    hr: () => ( <hr style={{ height: "2.7px", backgroundColor: "white" }} /> ),

    // tasklist 

    ...components,
  };
}
