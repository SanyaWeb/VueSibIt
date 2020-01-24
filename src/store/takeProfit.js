import Inputmask from "inputmask";

export default {
    state: {
        takeProfit: {
            name: "takeProfit",
            value: "0",
            percent: 0,
            defaultPercent: 0.3,
            unit: "dollar",
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
        takeProfitVal(state) {
            if(state.takeProfit.unit === "dollar") {
                return state.takeProfit.value;
            } else {
                return String(Math.round(state.takeProfit.percent * 100));
            }

        },
        takeProfitField(state) {
            return state.takeProfit;
        },
    },
    mutations: {
        takeProfitSetVal(state, payload) {

            if(state.takeProfit.unit === "dollar") {
                state.takeProfit.value = payload.value;
                state.takeProfit.percent = Math.round(Number(state.takeProfit.value.replace(/[^0-9+]/g, ''))*100/payload.sumInv)/100;
            } else {
                state.takeProfit.percent = Number(val)/100;
                state.takeProfit.value = String(Math.round(payload.sumInv*state.takeProfit.percent))
            }
        },
        takeProfitSetDefault(state, payload) {
            if(payload.takeProfitCheck) {
                state.takeProfit.value = String(payload.sumInv * state.takeProfit.defaultPercent);
                state.takeProfit.percent = state.takeProfit.defaultPercent;
            } else {
                state.takeProfit.value = 0;
                state.takeProfit.percent = 0;
            }
        },
        takeProfitCounterAdd(state, payload) {
            if(state.takeProfit.unit === "dollar") {
                state.takeProfit.value = String(Number(state.takeProfit.value.replace(/[^0-9+]/g, '')) + 1);
                state.takeProfit.percent = Math.round(Number(state.takeProfit.value.replace(/[^0-9+]/g, ''))*100/payload.sumInv)/10000;
            } else {
                state.takeProfit.percent = (Math.round(state.takeProfit.percent * 100) + 1)/100;
                state.takeProfit.value = String(Math.round(payload.sumInv*state.takeProfit.percent));
            }
        },
        takeProfitCounterReduce(state, payload) {
            if(state.takeProfit.unit === "dollar") {
                let val = Number(state.takeProfit.value.replace(/[^0-9+]/g, ''));
                if(val >= 1) {
                    state.takeProfit.value = String(val- 1);
                    state.takeProfit.percent = Math.round((val-1)*100/payload.sumInv)/100;
                }

            } else {

                let val = Math.round(state.takeProfit.percent * 100);
                if(val >= 1) {
                    state.takeProfit.percent = (val - 1) / 100;
                    state.takeProfit.value = String(Math.round(payload.sumInv * state.takeProfit.percent));
                }
            }
        },

        takeProfitChangeUnit(state, payload) {
            state.takeProfit.unit = payload.limitType;
        },
        setLimitsTakeProfit(state, sumInv) {

            if(state.takeProfit.unit === "dollar") {
                let limit = Number(String(state.takeProfit.value).replace(/[^0-9+]/g, ''));
                state.takeProfit.percent = Math.round(limit*100/sumInv)/100;
            } else {
                state.takeProfit.value = String(Math.round(sumInv*state.takeProfit.percent));
            }
        },

        takeProfitError(state, error) {
            state.takeProfit.result.valid = false;
            state.takeProfit.result.error = error;
        },
        takeProfitHideError(state) {
            state.takeProfit.result = {
                valid: true,
            }
        }
    },
    actions: {
        takeProfitInit({commit, getters}, payload) {
            let numberMask = new Inputmask({
                regex: "([0-9 ]+)",
                placeholder: ""
            });

            numberMask.mask(payload.takeProfitInput.get(0));
            commit("takeProfitSetDefault", payload.sumInv);
        }

    }
}