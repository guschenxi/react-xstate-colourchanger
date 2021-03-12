import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Machine, assign, send, State } from "xstate";
import { useMachine, asEffect } from "@xstate/react";
import { inspect } from "@xstate/inspect";
import { dmMachine, TODOitem, Timer } from "./dmAppointment";


inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
});

import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}



const machine = Machine<SDSContext, any, SDSEvent>({
    id: 'root',
    type: 'parallel',
    states: {
        dm: {
          initial: 'init',
          id: "main",
          states:{
              init: {on: {CLICK: 'IntentMachine'}
        },
/* Intent Machine START*/

                IntentMachine: {
  id: 'intent',
  initial: 'welcome',
  context: {
    text: undefined,
    intent: undefined,
    error: undefined
  },
  states: {

        welcome: {
            initial: "prompt",
            on: { ENDSPEECH: "intent" },
            states: {
                prompt: { entry: say("Welcome!") }
            }
        },
        intent: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    actions: assign((context) => { return { text: context.recResult } }),
                    target: "loading"
                }]
            },
            states: {
                prompt: {
                    entry: say("What would you like to do?"),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
            }
        },

    loading: {
      invoke: {
        id: 'getIntent',
        src: (context) => nluRequest(context.text),
        onDone: {
          target: 'success',
          actions: assign({ intent: (context, event) => event.data })
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    success: {
            on: {
              "": [
                   {target: 'more_info', cond: (context) => context.intent.intent.confidence < 0.70 },
                   {target: '#root.dm.dmAppointment', cond: (context) => context.intent.intent.name === "Appointment" },
                   {target: '#root.dm.TODOitem', cond: (context) => context.intent.intent.name === "TODOitem" },
                   {target: '#root.dm.Timer', cond: (context) => context.intent.intent.name === "Timer" },
                   {target: 'more_info' }
                  ] 
                 }
    },
    failure: {
      entry: say("I can't figure out what you want me to do."),
      on: { ENDSPEECH: "intent" }
    },
    more_info: {
      entry: say("I'm not very sure about your intent. Try to specify it."),
      on: { ENDSPEECH: "intent" }
    }
  }
},

/* Intent Machine END*/

                dmAppointment: {...dmMachine},
                TODOitem: {...TODOitem},
                Timer: {...Timer},
            }


        },
        asrtts: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        LISTEN: 'recognising',
                        SPEAK: {
                            target: 'speaking',
                            actions: assign((_context, event) => { return { ttsAgenda: event.value } })
                        }
                    }
                },
                recognising: {
                    entry: 'recStart',
                    exit: 'recStop',
                    on: {
                        ASRRESULT: {
                            actions: ['recLogResult',
                                assign((_context, event) => { return { recResult: event.value } })],
                            target: '.match'
                        },
                        RECOGNISED: 'idle'
                    },
                    states: {
                        match: {
                            entry: send('RECOGNISED'),
                        },
                    }
                },
                speaking: {
                    entry: 'ttsStart',
                    on: {
                        ENDSPEECH: 'idle',
                    }
                }
            }
        }
    },
},
    {
        actions: {
            recLogResult: (context: SDSContext) => {
                /* context.recResult = event.recResult; */
                console.log('<< ASR: ' + context.recResult);
            },
            test: () => {
                console.log('test')
            },
            logIntent: (context: SDSContext) => {
                /* context.nluData = event.data */
                console.log('<< NLU intent: ' + context.nluData.intent.name)
            }
        },
    });



interface Props extends React.HTMLAttributes<HTMLElement> {
    state: State<SDSContext, any, any, any>;
}
const ReactiveButton = (props: Props): JSX.Element => {
    switch (true) {
        case props.state.matches({ asrtts: 'recognising' }):
            return (
                <button type="button" className="glow-on-hover"
                    style={{ animation: "glowing 20s linear" }} {...props}>
                    Listening...
                </button>
            );
        case props.state.matches({ asrtts: 'speaking' }):
            return (
                <button type="button" className="glow-on-hover"
                    style={{ animation: "bordering 1s infinite" }} {...props}>
                    Speaking...
                </button>
            );
        default:
            return (
                <button type="button" className="glow-on-hover" {...props}>
                    Click to start
                </button >
            );
    }
}

function App() {
    const { speak, cancel, speaking } = useSpeechSynthesis({
        onEnd: () => {
            send('ENDSPEECH');
        },
    });
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
            send({ type: "ASRRESULT", value: result });
        },
    });
    const [current, send, service] = useMachine(machine, {
        devTools: true,
        actions: {
            recStart: asEffect(() => {
                console.log('Ready to receive a color command.');
                listen({
                    interimResults: false,
                    continuous: true
                });
            }),
            recStop: asEffect(() => {
                console.log('Recognition stopped.');
                stop()
            }),
            changeColour: asEffect((context) => {
                console.log('Repainting...');
                document.body.style.background = context.recResult;
            }),
            ttsStart: asEffect((context, effect) => {
                console.log('Speaking...');
                speak({ text: context.ttsAgenda })
            }),
            ttsCancel: asEffect((context, effect) => {
                console.log('TTS STOP...');
                cancel()
            })
            /* speak: asEffect((context) => {
	     * console.log('Speaking...');
             *     speak({text: context.ttsAgenda })
             * } */
        }
    });


    return (
        <div className="App">
            <ReactiveButton state={current} onClick={() => send('CLICK')} />
        </div>
    )
};



/* RASA API
 *  */
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const rasaurl = 'https://lt2216-a2.herokuapp.com/model/parse'
const nluRequest = (text: string) =>
    fetch(new Request(proxyurl + rasaurl, {
        method: 'POST',
        headers: { 'Origin': 'http://maraev.me' }, // only required with proxy
        body: `{"text": "${text}"}`
    }))
        .then(data => data.json());

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
    rootElement);



