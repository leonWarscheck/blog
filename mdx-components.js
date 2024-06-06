export function useMDXComponents(components) {
  return {
    // pre: ({children})=> <pre>{children}</pre>,
    hr: () => <hr style={{ height: "2.7px", backgroundColor: "white" }} />,
    // tasklist?
    ...components,
  };
}
