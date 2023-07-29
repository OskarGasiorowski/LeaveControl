import { atom } from 'jotai';
import { Leave } from '../../hooks/api';

export const selectedDatesAtom = atom<Date[]>([]);
export const hoverLeaveIdAtom = atom<string | null>(null);
export const selectedLeaveIdAtom = atom<string | null>(null);
export const editModeAtom = atom<boolean>(false);
export const leaveEditingAtom = atom<Leave | null>(null);
