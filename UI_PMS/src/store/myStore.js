import {create} from 'zustand';

export const useMyStore = create((set) => ({
    userid: 1,
    title: 'Project Management System',
    changeTitle: (name) => set({title: name}),
    refresh:0,
    setRefresh: () => set({refresh: refresh + 1}),
    orgTitle:'',
    setOrgTitle: (name) => set({orgTitle: name}),
    collegeName:'RCPIT',
    setCollegeName: (name) => set({collegeName: name}),
    clearOrgTitle: () => ({orgTitle: ''})
}));
