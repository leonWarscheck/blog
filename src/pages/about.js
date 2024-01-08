import Head from 'next/head';

export default function aboutPage(){
    return(
        <main className='max-w-2xl mx-auto pt-28'>
            <Head><title>About Leon Andersen</title></Head>
        <h2><a href="https://github.com/leonAndersen">Github</a></h2>
        <h2><a href="https://twitter.com/leonAndersen">Twitter</a></h2>
        <h2><a href="mailto:leon.andersen@protonmail.com">Email</a></h2>
        <h1>Leon Andersen</h1>
        <h3>"Creative power is head and heart working together."</h3>
        <p>Leon is a Fullstack Senior Developer at MonkeyType. 
        After studying music production he exploredWebdevelopment and became a programmer.He is specialized in React and Node and has a strong passion for communication protocols.
        </p>
        <p>
        Other Interests/ Skills:- The Art of Learning, - Systems Thinking, - Sales/ Entrepreneurship, 
        - Trauma/ Psychology,- and Media Design.
        </p>
        </main>
    )
};
