# LeonWarscheck.com

>*deployed at: [LeonWarscheck.com](https://leonwarscheck.com)*

> *Explore the repository in a fully functional one-click IDE:
> https://stackblitz.com/~/github.com/leonWarscheck/blog*

Welcome to my blog about webdevelopment.

![blog walkthrough](/public/blog.gif)

It includes a typing trainer specialized in maximizing your speed in typing
symbols.

![typing demo](/public/typing.gif)

Have fun, and make sure to subscribe for new posts!


## SymbolTrainer Core Logic

You can find the core logic and "in-game" state management in:

```
/src/features/symbol-trainer/
├── components/
│   ├── ...
│   └── trainer-section.js
├── ...
├── helpers.js
├── README.md
├── reducer.js
├── sagas.js
└── symbol-trainer-page.js
```
The related testfiles are co-located, aswell as in `/end-to-end`.
</br >

## Explore the Codebase

As mentioned above, the most fluent way to explore the codebase is at:

https://stackblitz.com/~/github.com/leonWarscheck/blog

Here you have **an instant, full IDE in your browser**, including:

- `cmd + click` navigation to function definitions etc.
- TSDoc comments on hovering
- Type Information on hovering
- full search functionality
