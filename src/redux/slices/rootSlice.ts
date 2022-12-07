import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Spider-Man",
        description: "Sometimes student, sometimes scientist and sometimes photographer, Peter Parker is a full-time super hero better known as the web-slinging and wall-crawling Spider-Man.",
        comics_appeared_in: 4278,
        super_power: "Spider-Physiology; Wall-Crawling, Super: Strength, Speed, Stamina, Reflexes; Spider-Sense"
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseAppearances: (state, action) => { state.comics_appeared_in = action.payload},
        choosePower: (state, action) => { state.super_power = action.payload},
    }
})

// Export Reducers
export const reducer = rootSlice.reducer;
export const {
    chooseName,
    chooseDescription,
    chooseAppearances,
    choosePower,
} = rootSlice.actions;