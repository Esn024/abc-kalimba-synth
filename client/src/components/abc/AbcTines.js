import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext';

import AbcTine from './AbcTine';

const AbcTines = () => {
  const { tines } = useContext(AppContext);

  //onClick - clickOnNoteButton(this)
  //id is keyboard letter
  //height depends on how low note is.
  //innerText is the ABC note

  console.log({ tines });
  return (
    <Tines>
      {tines &&
        tines.map((tine, index) => (
          <AbcTine
            abcNote={tine.abcNote}
            keyboardLetter={tine.keyboardLetter}
            cents={tine.cents}
            key={index}
          />
        ))}
    </Tines>
  );
};

const Tines = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

// const Tine = styled.button`
//   width: 30px;
//   padding: 0;
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
// `;

export default AbcTines;
