import { atom } from 'jotai';
import { MutableRefObject } from 'react';

export const rightSidebarRef = atom<MutableRefObject<null> | undefined>(undefined);
export const rightSidebarWidthAtom = atom(0);
