import '@styles/components/Headline.scss';

interface HeadlineProps {
  /** Check out the `src/styles/components/Headline.scss` in the source code to view the relevant styles */
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const Headline: React.FC<HeadlineProps> = ({ level, children }) => {
  return (
    <p className='headline' data-level={level}>
      { children }
    </p>
  )
}