import { MachineConfig, send, Action, assign } from "xstate";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

const grammar1: { [index: string]: { person?: string } } = {
    "John": { person: "John Appleseed" },
    "Monica": { person: "Monica Svensson" },
    "Sven": { person: "Sven Svensson" },
    "Jack": { person: "Jack Svensson" },}
const grammar2: { [index: string]: { day?: string } } = {
    "on Monday": { day: "Monday" },
    "on Tuesday": { day: "Tuesday" },
    "on Wednesday": { day: "Wednesday" },
    "on Thursday": { day: "Thursday" },
    "on Friday": { day: "Friday" },
    "on Saturday": { day: "Saturday" },
    "on Sunday": { day: "Sunday" },}
const grammar3: { [index: string]: { whole_day?: boolen } } = {
    "yes": { whole_day: true },
    "no": { whole_day: false },
    "whole day": { whole_day: true },
    "of course": { whole_day: true },
    "no way": { whole_day: false },}
const grammar4: { [index: string]: { time?: string } } = {
    "at 8": { time: "8:00" },
    "at 9": { time: "9:00" },
    "at 11": { time: "11:00" },
    "at 10": { time: "10:00" },
    "at 12": { time: "12:00" },
    "at 13": { time: "13:00" },
    "at 14": { time: "14:00" },
    "at 15": { time: "15:00" },
    "at 16": { time: "16:00" },
    "at 17": { time: "17:00" },
    "at 18": { time: "18:00" },}
const grammar5: { [index: string]: { confirm?: boolen } } = {
    "yes": { confirm: true },
    "confirm": { confirm: true },
    "no": { confirm: false },
    "start over": { confirm: false },
}


export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    id: "main",
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: {
            initial: "prompt",
            on: { ENDSPEECH: "who" },
            states: {
                prompt: { entry: say("Let's create an appointment") }
            }
        },
        who: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "person" in (grammar1[context.recResult] || {}),
                    actions: assign((context) => { return { person: grammar1[context.recResult].person } }),
                    target: "day"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: say("Who are you meeting with?"),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry I don't know them"),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        day: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "day" in (grammar2[context.recResult] || {}),
                    actions: assign((context) => { return { day: grammar2[context.recResult].day } }),
                    target: "whole_day"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. ${context.person}. On which day is your meeting?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry I don't understand which day you mean."),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        whole_day: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "whole_day" in (grammar3[context.recResult] || {}),
                    actions: assign((context) => { return { whole_day: grammar3[context.recResult].whole_day } }),
                    target: ".choose"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. ${context.day}. Will it take the whole day?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                choose: {
                      on: {
                        "": [
                             {target: '#main.time', cond: (context) => context.whole_day === false},
                             {target: '#main.confirm_without_time'}] 
                      }
                },
                nomatch: {
                    entry: say("Sorry I don't understand. Say yes or no."),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        time: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "time" in (grammar4[context.recResult] || {}),
                    actions: assign((context) => { return { time: grammar4[context.recResult].time } }),
                    target: "confirm_with_time"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. ${context.person}, ${context.day}. What time is your meeting?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry I don't understand. Say a time."),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        confirm_without_time: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "confirm" in (grammar5[context.recResult] || {}),
                    actions: assign((context) => { return { confirm: grammar5[context.recResult].confirm } }),
                    target: ".choose"
                    

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `Do you want me to creat an appointment with ${context.person} on ${context.day} for the whole day?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                choose: {
                      on: {
                        "": [
                             {target: '#main.final', cond: (context) => context.confirm === true },
                             {target: '#main.who', cond: (context) => context.confirm === false }
                            ] 
                      }
                },
                nomatch: {
                    entry: say("Sorry I don't understand. Say yes or no."),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        confirm_with_time: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "confirm" in (grammar5[context.recResult] || {}),
                    actions: assign((context) => { return { confirm: grammar5[context.recResult].confirm } }),
                    target: ".choose"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `Do you want me to creat an appointment with ${context.person} on ${context.day} at ${context.time}?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                choose: {
                      on: {
                        "": [
                             {target: '#main.final', cond: (context) => context.confirm === true },
                             {target: '#main.who', cond: (context) => context.confirm === false }
                            ] 
                      }
                },
                nomatch: {
                    entry: say("Sorry I don't understand. Say yes or no."),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        final: {
            initial: "prompt",
            states: {
                prompt: { 
                    type: "final",
                    entry: say("Your appointment has been created!") }
            }
        },
    }
})
