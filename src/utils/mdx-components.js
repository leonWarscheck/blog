/* eslint-disable react/prop-types */
import NativeLink from 'next/link';
// import Highlight, { defaultProps } from 'prism-react-renderer';
// import nightOwl from 'prism-react-renderer/themes/nightOwl';
// import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
// import { mergeDeepRight } from 'ramda';
import React from 'react';

export const GenericLink = props => {
  if (props.href.startsWith('/') && !props.href.startsWith('/docs')) {
    return <InternalLink {...props} />;
  }

  return <ExternalLink {...props} />;
};

export const InternalLink = ({ href, as, children }) => (
  <NativeLink href={href} as={as}>
    <a className="mdx-component--a">{children}</a>
  </NativeLink>
);

export const ExternalLink = ({ href, children }) => (
  <a
    className="mdx-component--a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const BlockQuote = ({ children }) => (
  <blockquote className="mdx-component--blockquote">{children}</blockquote>
);

const Code = ({ children, className }) => {
  const language = className?.replace(/language-/, '');
  const isDarkModeActive = true;

  const theme = isDarkModeActive
    ? mergeDeepRight(nightOwl, { plain: { backgroundColor: '#141414' } })
    : mergeDeepRight(nightOwlLight, { plain: { backgroundColor: '#ffffff' } });

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const H2 = ({ children }) => (
  <h2 className="mdx-component--heading-two">{children}</h2>
);

const Img = ({ className, ...props }) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img className={`${className || ''} mdx-component--img`} {...props} />
);

const InlineCode = ({ children }) => (
  <code className="mdx-component--inline-code">{children}</code>
);

const Li = ({ children }) => <li className="mdx-component--li">{children}</li>;

const P = ({ children }) => {
  return <p className="mdx-component--p">{children}</p>;
};

const components = {
  a: GenericLink,
  blockquote: BlockQuote,
  code: Code,
  h2: H2,
  img: Img,
  inlineCode: InlineCode,
  li: Li,
  p: P,
};

export { components };