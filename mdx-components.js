export function useMDXComponents(components) {
  return {
    ...components,
    hr: () => <hr style={{ height: '2.7px', backgroundColor: 'white' }} />,
    br: () => <br style={{ lineHeight: '10px' }} />,
  };
}
