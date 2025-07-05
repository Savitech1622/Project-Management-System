import {create} from 'zustand';

export const useMyStore = create((set) => ({
    title: 'Project Management System',
    changeTitle: (name) => set({title: name})
}));
