import localFont from 'next/font/local';

const openSansObject = localFont({
  src: [
    {
      path: './OpenSans-VariableFont.ttf',
      style: 'normal',
    },
    {
      path: './OpenSans-Italic-VariableFont.ttf',
      style: 'italic',
    },
  ],
});

export const openSans = openSansObject.className;

const fontMonoObject = localFont({
  src: [
    {
      path: './RobotoMono-Regular.ttf',
      style: 'normal',
    },
  ],
});

export const fontMono = fontMonoObject.className;
