import { format, parseISO } from 'date-fns';

// in blog-feed-home-page, formats dates of blogposts
export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
