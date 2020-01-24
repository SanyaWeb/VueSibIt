import InputFormatNumber from "./inputFormatNumber"

let numberFormat = new InputFormatNumber();

export default {
    state: {
        field: {
            value: "",
            defaultValue: "5000",
            name: "sumInv",
            error: {
                result: false,
                error: ""
            },
            inputValidateParams: {
                type: "num",
                min: 0,
                max: 200000,
                maxError: 'Максимальная сумма инвестиции: <span class="error-message__value">$ 200 000</span>',
            },
            lastKey: null,
            result: {
                valid: true
            },
        }
    },
    getters: {
        fieldVal(state) {
            return state.field.value;
        },
        getField(state) {
            return state.field;
        },
        defaultVal(state) {
            return state.field.defaultValue;
        },
    },
    mutations: {
        setValue(state, value) {
            state.field.value = value;
        },
        formatField(state, payload) {
            state.field.value = payload.value;
            numberFormat.inputFormatField(payload.thisInput, state.field);
            state.field.result = numberFormat.getResult();
            state.field.value = state.field.result.value;
        },

        initField(state, thisInput) {
            numberFormat.init(thisInput, state.field);
            state.field.result = numberFormat.getResult();
            state.field.value = state.field.result.value;
        },
        sumInvError(state, error) {
            state.field.result.valid = false;
            state.field.result.error = error;
        },

    },
    actions: {
        init({commit, getters}, thisInput) {
            commit("setValue", getters.defaultVal);
            commit("initField", thisInput);
        },

        sumInvInput({state, commit}) {
            let val = Number(state.field.value.replace(/[^0-9+]/g, ''));

            commit("setLimitsTakeProfit", val);
            commit("setLimitsStopLoss", val);
        }

    }
}