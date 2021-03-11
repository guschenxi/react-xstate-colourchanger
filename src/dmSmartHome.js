import { MachineConfig, send, Action, assign } from "xstate";

import { loadGrammar } from './runparser'
import { parse } from './chartparser'
import { grammar } from './grammars/smart'

const gram = loadGrammar(grammar)
function prs_grammar(input: string) {
  prs = parse(input.split(/\s+/), gram);
  result = prs.resultsForRule(gram.$root);
  console.log(result);
  return result;
}



function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

export const SmartHomeMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'welcome',
    id: "SmartHomeMachine",
    states: {

        welcome: {
            initial: "prompt",
            on: { ENDSPEECH: "what_to_do" },
            states: {
                prompt: { entry: say("Welcome to the Smart Home!") }
            }
        },
        what_to_do: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => prs_grammar[context.recResult] !== null || {}),
                    actions: assign((context) => { return { result: prs_grammar[context.recResult] } }),
                    target: "end"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: say("What to you want me to do?"),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry I don't understand"),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        end: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("Ok, I will do that."),
                },
            }
        },
    }
})
