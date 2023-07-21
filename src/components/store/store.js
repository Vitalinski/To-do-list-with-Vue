import { defineStore } from "pinia";

export const useToDoStore = defineStore('toDoStore', {
state:()=>({
    tasks:[]
})
})