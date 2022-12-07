// Imports from React and packages
import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

//Local Imports
import { 
    chooseName,
    chooseDescription,
    chooseAppearances,
    choosePower,
} from "../../redux/slices/rootSlice";
import { Input } from "../sharedComponents/Input";
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface HeroFormProps {
    id?:string;
    data?: {}
}

interface HeroState {
    name: string;
    description: string;
    comics_appeared_in: number;
    super_power: string;

}

export const HeroForm = (props:HeroFormProps) => {
    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event: any) => {
        console.log(props.id)
        if (props.id) {
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseAppearances(data.comics_appeared_in))
            dispatch(choosePower(data.super_power))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name='name' placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name='description' placeholder="Description" />
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Year</label>
                    <Input {...register('comics_appeared_in')} name='comics_appeared_in' placeholder="Appearances" />
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name='super_power' placeholder="Super Power" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}