import $ from "jquery"
import InputFormatNumber from "./inputFormatNumber"
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/slider';

let numberFormat = new InputFormatNumber();

export default {
    state: {
        field: {
            name: "mult",
            value: "",
            defaultValue: "40",
            inputValidateParams: {
                type: "num",
                min: 0,
                max: 99,
                maxError: 'Максимальное значение мультипликатора: <span class="error-message__value">× 99</span>',
            },
            lastKey: null,
            result: {
                valid: true
            },
            sendValidate: {
                min: 1,
                max: 40
            },
        }
    },
    getters: {
        multVal(state) {
            return state.field.value;
        },
        multField(state) {
            return state.field;
        },
        multDefaultVal(state) {
            return state.field.defaultValue;
        },
    },
    mutations: {
        multValue(state, value) {
            state.field.value = value;
        },
        multFormatField(state, payload) {
            state.field.value = payload.value;
            numberFormat.inputFormatField(payload.thisInput, state.field);
            state.field.result = numberFormat.getResult();
            state.field.value = state.field.result.value;
        },

        multInitField(state, thisInput) {
            numberFormat.init(thisInput, state.field);
            state.field.result = numberFormat.getResult();
            state.field.value = state.field.result.value;
            thisInput.oninput = () => {
                $("#invest-form-mult-slider").slider("value", Number(state.field.value.replace(/[^0-9+]/g, '')));
            };
            thisInput.onfocus = () => {
                $("#invest-form-mult-slider").parent('.invest-form-mult-slider-wrap').css("display", "block");
            };
        },
        multError(state, error) {
            state.field.result.valid = false;
            state.field.result.error = error;
        },
    },
    actions: {
        multInit({commit, getters}, thisInput) {
            commit("multValue", getters.multDefaultVal);
            commit("multInitField", thisInput);
        }

    }
}