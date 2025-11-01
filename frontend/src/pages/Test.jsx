import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

export default function Test(){
  return (
    <div style={{ padding: 20, background: '#222' }}>
      <Ring size={50} speed={1.5} bgOpacity={0.25} />
    </div>
  );
}
