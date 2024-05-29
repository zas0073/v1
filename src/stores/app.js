// Utilities
import { version } from 'core-js'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    name: "키다리",
    version: "1.01",
    updated: "2024-05-28"
    //
  }),
})
