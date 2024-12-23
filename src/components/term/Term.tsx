import { createContext, JSX, useContext, useEffect, useState } from 'react';
import termconfig from '@config/term.config.json';
import '@styles/components/Term.scss';

const TermContext: React.Context<object> | null = createContext(null);

interface TermProps {
  /** The name of the font that will be the main font for the library you are using */
  fontFamily?: string;
  /** The font size that will be the main font for the library you are using */
  fontSize?: number;
  /** Additional CSS properties for the library provider */
  css?: React.CSSProperties;
  children: React.ReactNode;
};

export const Term: React.FC<TermProps> = ({ fontFamily, fontSize, css, children }): JSX.Element => {
  const [config] = useState({
    theme: termconfig.theme,
    fontFamily: fontFamily || termconfig.fontFamily,
    fontSize: fontSize !== undefined ? fontSize : termconfig.fontSize,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.theme);
    document.documentElement.style.fontFamily = fontFamily;
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [config]);

  return (
    <TermContext.Provider value={config}>
      <div className='term-wrapper' style={css}>
        { children }
      </div>
    </TermContext.Provider>
  );
};

export const useTerm = () => {
  const context: object = useContext(TermContext);
  if (!context) {
    throw new Error('useTerm must be used within a TermProvider');
  }
  return context;
};
