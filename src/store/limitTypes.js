import InputFormatNumber from "./inputFormatNumber"
import $ from "jquery";

let numberFormat = new InputFormatNumber();

export default {
    state: {
        limitTypes : {
            name: "limitType",
            type: "radio",
            value: "dollar",
            inputValidateParams: {
                type: "radio",
            },
            elements: [
                {
                    name: "dollar",
                    value: "dollar",
                    checked: true
                },
                {
                    name: "percent",
                    value: "percent",
                    checked: false
                }
            ],

        },
    },
    getters: {
        limitTypeVal(state) {
            return state.limitTypes.value;
        },
        limitTypes(state) {
            return state.limitTypes;
        },
    },
    mutations: {
        setLimitType(state, value) {
            state.limitTypes.value = value;
        },
        limitsChangeUnit(state, payload) {
            let oldVal = state.limitTypes.value;

            if(payload.input.is(':checked')) {
                state.limitTypes.value = payload.input.val();
            }

            //this.fields.takeProfit.unit = field.value;
            //this.fields.stopLoss.unit = field.value;

            const limitFields = this.investForm.find(".invest-form__field-val_limit");

            limitFields.each(function() {
                $(this).removeClass("invest-form__field-val_" + oldVal);
                $(this).addClass("invest-form__field-val_" + field.value);
            });

            if(state.limitTypes.value === "dollar") {
                this.investForm.find("input[name=takeProfit]").val( this.fields.takeProfit.value );
                this.investForm.find("input[name=stopLoss]").val( this.fields.stopLoss.value);
            } else {
                let takeProfitPercent = String(Math.round(this.fields.takeProfit.percent * 100));
                let stopLossPercent = String(Math.round(this.fields.stopLoss.percent * 100));

                this.investForm.find("input[name=takeProfit]").val( this.formatNum( takeProfitPercent ) );
                this.investForm.find("input[name=stopLoss]").val( this.formatNum( stopLossPercent ) );
            }
        },
    },
    actions: {
        init({commit, getters}, thisInput) {
            //commit("setValue", getters.defaultVal);
            //commit("initField", thisInput);
        }

    }
}