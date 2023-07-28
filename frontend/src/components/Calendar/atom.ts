import { atom } from 'jotai';

export const selectedDatesAtom = atom<Date[]>([]);
export const hoverLeaveIdAtom = atom<string | null>(null);
