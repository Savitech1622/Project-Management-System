import {create} from 'zustand';

export const useMyStore = create((set) => ({
    userid: 1,
    title: 'Project Management System',
    changeTitle: (name) => set({title: name})
}));
