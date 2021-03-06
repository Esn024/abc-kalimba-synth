import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext';

const AbcTine = ({ abcNote, keyboardLetter, cents, color, tineIndex }) => {
  const {
    userPlayNote,
    abcToMidiNoteName,
    midiNoteNameToNumber,
    validAbcNoteRegex,
  } = useContext(AppContext);

  const tineEl = useRef(null);

  //onClick - clickOnNoteButton(this)
  //id is keyboard letter
  //innerText is the ABC note

  useEffect(() => {
    const handleKeydown = (ev) => {
      // console.log('You pressed: ' + ev.key);
      if (ev.key === keyboardLetter) {
        tineEl.current.click();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [keyboardLetter]);

  //height of tine in CSS depends on how low note pitch is.
  // console.log('match', abcNote, abcNote.match(validAbcNoteRegex));
  const tineHeight = abcNote.match(validAbcNoteRegex)
    ? 150 - midiNoteNameToNumber(abcToMidiNoteName(abcNote))
    : 80;

  return (
    <Tine
      className={`tine${color === 1 ? ' darktine' : ''}`}
      id={'tine-' + tineIndex}
      onClick={() => {
        userPlayNote(abcNote, cents);
        tineEl.current.classList.add('active-tine');
        // after a time interval, remove the "active-tine" class, thereby removing the color
        setTimeout(() => {
          tineEl.current.classList.remove('active-tine');
        }, '400');
      }}
      style={{
        height: `${tineHeight}px`,
      }}
      ref={tineEl}
    >
      {abcNote}
    </Tine>
  );
};

const Tine = styled.button`
  width: 30px;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default AbcTine;
