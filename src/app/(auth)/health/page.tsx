'use client';

import { useConfig } from '@/contexts/config-context';

const HealthPage = () => {
  const config = useConfig();
  return (
    <div>
      <div>Health Page</div>
      <div>{JSON.stringify(config)}</div>
    </div>
  );
};

export default HealthPage;
