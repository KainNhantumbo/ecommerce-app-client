'use client';

import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';

export default function Page() {
  const { httpClientAPI } = useAppContext();

  return (
    <main>
      <Label>Products</Label>
    </main>
  );
}
