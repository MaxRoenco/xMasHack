import React from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const GlowEffect = () => {
  return (
    <EffectComposer>
      <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
    </EffectComposer>
  );
};

export default GlowEffect;
