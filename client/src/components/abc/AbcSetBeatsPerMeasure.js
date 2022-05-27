import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext';

const AbcSetBeatsPerMeasure = () => {
  const {
    beatsPerMeasure,
    setBeatsPerMeasure,
    musicalSections,
    setMusicalSections,
    tines,
  } = useContext(AppContext);
  return (
    <>
      <StyledLabel>
        <Text>Beats Per Measure:</Text>
        <StyledInput
          type='number'
          id='quantity'
          name='quantity'
          min='2'
          max='13'
          value={beatsPerMeasure}
          onChange={(e) => {
            const newBeatsPerMeasure = e.target.value;
            const beatsHaveBeenAdded = newBeatsPerMeasure > beatsPerMeasure;
            const numberOfNewBeatsAdded = newBeatsPerMeasure - beatsPerMeasure;
            const numberOfTines = tines.length;

            setBeatsPerMeasure(newBeatsPerMeasure);

            // also change musicalSections (add or remove the right number of beat rows in the measures array)
            let modifiedMusicalSections = [];
            let modifiedMeasures = [];
            let modifiedMeasure = [];

            musicalSections.forEach((musicalSection, index) => {
              musicalSection.measures.forEach((measure) => {
                //if new # of beats is more than previous one, keep previous data & add the right number of empty values; if shorter, remove some
                modifiedMeasure = beatsHaveBeenAdded
                  ? [
                      ...measure,
                      ...Array(numberOfNewBeatsAdded)
                        .fill(0)
                        .map((beatRow) => new Array(numberOfTines).fill(0)),
                    ]
                  : measure.slice(0, newBeatsPerMeasure);

                modifiedMeasures.push(modifiedMeasure);
                // reset
                modifiedMeasure = [];
              });
              modifiedMusicalSections.push({
                ...musicalSections[index],
                measures: modifiedMeasures,
              });
              // reset
              modifiedMeasures = [];
            });

            // finally, update state with the modified object
            setMusicalSections(modifiedMusicalSections);
          }}
        />
      </StyledLabel>
    </>
  );
};

const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 50px;
`;

const Text = styled.p`
  font-size: var(--font-size-small);
  color: black;
  margin-right: 8px;
`;

export default AbcSetBeatsPerMeasure;
