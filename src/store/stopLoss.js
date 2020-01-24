import InputFormatNumber from "./inputFormatNumber"
import Inputmask from "inputmask";

let numberFormat = new InputFormatNumber();

export default {
    state: {
        stopLoss: {
            name: "stopLoss",
            value: "0",
            percent: 0,
            defaultPercent: 0.3,
            unit: "dollar",
            disabled: true,
            counterInterval: null,
            inputValidateParams: {
                counter: true,
                type: "num",
                min: 0,
            },
            lastKey: null,
            result: {
                valid: true,
            },
            sendValidate: {
                minPercent: 10,
                percentError: 'Не может быть меньше <span class="error-message__value">10%</span>',
                dollarError: () => {
                    let sumInv = Number(this.fields.sumInv.value.replace(/[^0-9+]/g, ''));
                    return 'Не может быть меньше <span class="error-message__value">$ '+ 0.1 * sumInv +'</span>'
                },
            }
        }
    },
    getters: {
        stopLossVal(state) {
            if(state.stopLoss.unit === "dollar") {
                return state.stopLoss.value;
            } else {
                return String(Math.round(state.stopLoss.percent * 100));
            }

        },
        stopLossField(state) {
            return state.stopLoss;
        },
    },
    mutations: {
        stopLossSetVal(state, payload) {
            if(state.stopLoss.unit === "dollar") {
                state.stopLoss.value = payload.value;
                state.stopLoss.percent = Math.round(Number(state.stopLoss.value.replace(/[^0-9+]/g, ''))*100/payload.sumInv)/100;
            } else {
                state.stopLoss.percent = Number(payload.value.replace(/[^0-9+]/g, ''))/100;
                state.stopLoss.value = String(Math.round(payload.sumInv*state.stopLoss.percent))
            }
        },
        stopLossSetDefault(state, payload) {
            if(payload.stopLossCheck) {
                state.stopLoss.value = String(payload.sumInv * state.stopLoss.defaultPercent);
                state.stopLoss.percent = state.stopLoss.defaultPercent;
            } else {
                state.stopLoss.value = 0;
                state.stopLoss.percent = 0;
            }
        },
        stopLossCounterAdd(state, payload) {
            if(state.stopLoss.unit === "dollar") {
                state.stopLoss.value = String(Number(state.stopLoss.value.replace(/[^0-9+]/g, '')) + 1);
                state.stopLoss.percent = Math.round(Number(state.stopLoss.value.replace(/[^0-9+]/g, ''))*100/payload.sumInv)/100;
            } else {
                state.stopLoss.percent = (Math.round(state.stopLoss.percent * 100) + 1)/100;
                state.stopLoss.value = String(Math.round(payload.sumInv*state.stopLoss.percent));
            }
        },
        stopLossCounterReduce(state, payload) {
            if(state.stopLoss.unit === "dollar") {
                let val = Number(state.stopLoss.value.replace(/[^0-9+]/g, ''));
                if(val >= 1) {
                    state.stopLoss.value = String(val- 1);
                    state.stopLoss.percent = Math.round((val-1)*100/payload.sumInv)/100;
                }

            } else {

                let val = Math.round(state.stopLoss.percent * 100);
                if(val >= 1) {
                    state.stopLoss.percent = (val - 1) / 100;
                    state.stopLoss.value = String(Math.round(payload.sumInv * state.stopLoss.percent));
                }
            }
        },
        stopLossChangeUnit(state, payload) {
            state.stopLoss.unit = payload.limitType;
        },
        setLimitsStopLoss(state, sumInv) {
            if(state.stopLoss.unit === "dollar") {
                let limit = Number(String(state.stopLoss.value).replace(/[^0-9+]/g, ''));
                state.stopLoss.percent = Math.round(limit*100/sumInv)/100;
            } else {
                state.stopLoss.value = String(Math.round(sumInv*state.stopLoss.percent));
            }
        },
        stopLossError(state, error) {
            state.stopLoss.result.valid = false;
            state.stopLoss.result.error = error;
        },
        initStopLoss(state, thisInput) {
            numberFormat.init(thisInput, state.field);
            state.field.result = numberFormat.getResult();
            state.field.value = state.field.result.value;
        },
        stopLossHideError(state) {
            state.stopLoss.result = {
                valid: true,
            }
        }
    },
    actions: {
        stopLossInit({commit, getters}, payload) {
            let numberMask = new Inputmask({
                regex: "([0-9 ]+)",
                placeholder: ""
            });

            numberMask.mask(payload.stopLossInput.get(0));
            commit("stopLossSetDefault", payload.sumInv);
        }
    }
}