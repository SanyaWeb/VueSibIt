<template>
    <div class="invest-form__limits invest-form__limits_hidden">
        <div class="invest-form__limits-toggle">
            <span class="profit-loss-limits__toggle-icon" /> <span class="profit-loss-limits__toggle-text">Ограничить прибыль и убыток</span>
        </div>
        <div class="invest-form__limits-block">
            <div class="invest-form__row">
                <div class="invest-form__left-col">
                    <span class="invest-form__col-name">Ограничения в</span>
                </div>
                <div class="invest-form__right-col invest-form__right-col_left">
                    <span class="invest-form__limit-type">
                        <input type="radio" name="limitType" class="invest-form__limits-radio" v-model="limitType" value="percent" @change="limitsChangeUnit"  /> <span>%</span>
                    </span>
                    <span class="invest-form__limit-type">
                        <input type="radio" name="limitType" class="invest-form__limits-radio" v-model="limitType" value="dollar" @change="limitsChangeUnit" /> <span>$</span>
                    </span>
                </div>
            </div>
            <div class="invest-form__row">
                <div class="invest-form__left-col">
                    <label>
                            <span class="invest-form__col-name">
                                <input type="checkbox" class="invest-form__limit-checkbox" data-name="takeProfit" v-model="takeProfitCheck" @change="limitsDefaultVals" /> Прибыль
                            </span>
                    </label>
                </div>
                <div class="invest-form__right-col">
                    <div class="invest-form__field-val invest-form__field-val_limit invest-form__field-val_invest" :class="{ 'invest-form__field-val_disabled': !takeProfitCheck }">
                        <input type="text" name="takeProfit" class="invest-form__field-input invest-form__field-input_limit-counter" :disabled="!takeProfitCheck" v-model="takeProfit">
                        <div class="invest-form__counter-buttons" :class="{ 'invest-form__counter-buttons_disabled': !takeProfitCheck }" data-name="takeProfit" >
                            <div class="invest-form__counter-button invest-form__counter-button_top"></div>
                            <div class="invest-form__counter-button invest-form__counter-button_bottom"></div>
                        </div>
                        <div class="error-message"></div>
                    </div>
                </div>
            </div>
            <div class="invest-form__row">
                <div class="invest-form__left-col">
                    <label>
                            <span class="invest-form__col-name">
                                <input type="checkbox" class="invest-form__limit-checkbox" data-name="stopLoss" v-model="stopLossCheck" @change="limitsDefaultVals" /> Убыток
                            </span>
                    </label>
                </div>
                <div class="invest-form__right-col">
                    <div class="invest-form__field-val invest-form__field-val_limit invest-form__field-val_invest" :class="{ 'invest-form__field-val_disabled': !stopLossCheck }">
                        <input type="text" name="stopLoss" class="invest-form__field-input invest-form__field-input_limit-counter"  :disabled="!stopLossCheck" v-model="stopLoss">
                        <div class="invest-form__counter-buttons" :class="{ 'invest-form__counter-buttons_disabled': !stopLossCheck }" data-name="stopLoss">
                            <div class="invest-form__counter-button invest-form__counter-button_top"></div>
                            <div class="invest-form__counter-button invest-form__counter-button_bottom"></div>
                        </div>
                        <div class="error-message"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "LimitsBlock",
        data: function() {
            return {
                oldLimitType: this.$store.getters.limitTypeVal,
                takeProfitCheck: false,
                stopLossCheck: false,
                sumInv: Number(this.$store.getters.fieldVal.replace(/[^0-9+]/g, '')),
                counterInterval: null
            }
        },
        computed: {
            limitType: {
                get() {
                    return this.$store.getters.limitTypeVal;
                },
                set(value) {
                    this.$store.commit("setLimitType",  value);
                }
            },
            takeProfit: {
                get() {
                    const $element = $("#invest-form").find("input[name=takeProfit]");
                    this.hideError($element);

                    if(!this.$store.getters.takeProfitField.result.valid) {
                        this.showError(this.$store.getters.takeProfitField, $element, 4000);
                    }

                    return this.$store.getters.takeProfitVal;
                },
                set(value) {
                    this.$store.commit("takeProfitHideError");
                    const $element = $("#invest-form").find("input[name=takeProfit]");
                    let sumInv = Number(this.$store.getters.fieldVal.replace(/[^0-9+]/g, ''));
                    this.$store.commit("takeProfitSetVal",  {value, sumInv});
                }
            },
            stopLoss: {
                get() {
                    const $element = $("#invest-form").find("input[name=stopLoss]");
                    this.hideError($element);

                    if(!this.$store.getters.stopLossField.result.valid) {
                        this.showError(this.$store.getters.stopLossField, $element, 4000);
                    }
                    return this.$store.getters.stopLossVal;
                },
                set(value) {
                    this.$store.commit("stopLossHideError");
                    let sumInv = Number(this.$store.getters.fieldVal.replace(/[^0-9+]/g, ''));
                    this.$store.commit("stopLossSetVal",  {value, sumInv});
                }
            }
        },
        methods: {
            limitsChangeUnit() {

                const investForm = $("#invest-form");

                let oldVal = this.oldLimitType;
                this.oldLimitType = this.limitType;
                let limitType = this.limitType;

                this.$store.commit("takeProfitChangeUnit",  {limitType});
                this.$store.commit("stopLossChangeUnit",  {limitType});

                const limitFields = investForm.find(".invest-form__field-val_limit");

                limitFields.each(function() {
                    $(this).removeClass("invest-form__field-val_" + oldVal);
                    $(this).addClass("invest-form__field-val_" + limitType);
                });

            },


            limitsDefaultVals(e) {

                let sumInv = Number(this.$store.getters.fieldVal.replace(/[^0-9+]/g, ''));

                let commit = e.target.dataset.name + "SetDefault";

                if(e.target.dataset.name === "takeProfit") {
                    let takeProfitCheck = this.takeProfitCheck;
                    this.$store.commit(commit,  {sumInv, takeProfitCheck});
                }
                if(e.target.dataset.name === "stopLoss") {
                    let stopLossCheck = this.stopLossCheck;
                    this.$store.commit(commit,  {sumInv, stopLossCheck});
                }
            },
            showError(field, $element, time = null) {
                this.hideAllErrors();
                const $errorElement = $element.siblings('.error-message');
                $errorElement.html(field.result.error);
                $errorElement.addClass("visible");
                $element.addClass("not-valid");
                if(time) {
                    this.fieldErrorTimeOut = setTimeout(() => {
                        this.hideError($element);
                        clearTimeout(this.fieldErrorTimeOut);
                    }, time)
                }
            },

            hideError($element){
                $element.removeClass("not-valid");
                const $errorElement = $element.siblings('.error-message');
                $errorElement.text("");
                $errorElement.removeClass("visible");
                this.$store.state.takeProfit.result
            },

            hideAllErrors() {
                clearTimeout(this.fieldErrorTimeOut);
                const $elements = $("#invest-form").find("input[type=text]");
                const _this = this;
                $elements.each( function() {
                    _this.hideError($(this));
                });
            },
        },
        mounted: function() {

            const investForm__limits = $("#invest-form").find(".invest-form__limits");
            const investForm__limitsToggle = investForm__limits.children(".invest-form__limits-toggle");

            investForm__limitsToggle.on('click', function() {
                if(investForm__limits.hasClass("invest-form__limits_visible")) {
                    investForm__limits.removeClass("invest-form__limits_visible");
                    investForm__limits.addClass("invest-form__limits_hidden");
                } else {
                    investForm__limits.removeClass("invest-form__limits_hidden");
                    investForm__limits.addClass("invest-form__limits_visible");
                }
            });

            let sumInv = this.sumInv;
            let takeProfitInput = $("#invest-form").find("input[name=takeProfit]");
            let stopLossInput = $("#invest-form").find("input[name=stopLoss]");

            this.$store.dispatch("takeProfitInit", { sumInv, takeProfitInput } );
            this.$store.dispatch("stopLossInit", { sumInv, stopLossInput });

            const $counterButtons = $('.invest-form__counter-buttons');

            const _this = this;
            $counterButtons.children('.invest-form__counter-button_top').on('mousedown', function(e) {
                if(!$(this).parent().hasClass("invest-form__counter-buttons_disabled")) {

                    const limitType = $(this).parent().get(0).dataset.name;

                    let commit = limitType + "CounterAdd";
                    let sumInv = Number(_this.$store.getters.fieldVal.replace(/[^0-9+]/g, ''));
                    _this.$store.commit(commit,  {sumInv});

                    _this.counterInterval = setInterval(() => {
                        _this.$store.commit(commit,  {sumInv});
                    },300);

                }
            });

            $counterButtons.children('.invest-form__counter-button_bottom').on('mousedown', function() {
                if(!$(this).parent().hasClass("invest-form__counter-buttons_disabled")) {

                    const limitType = $(this).parent().get(0).dataset.name;

                    let commit = limitType + "CounterReduce";
                    let sumInv = Number(_this.$store.getters.fieldVal.replace(/[^0-9+]/g, ''));
                    _this.$store.commit(commit,  {sumInv});

                    _this.counterInterval = setInterval(() => {
                        _this.$store.commit(commit,  {sumInv});
                    },300);
                }
            });
            $counterButtons.children('.invest-form__counter-button_top').on("mouseup mouseleave", () => {
                clearInterval(this.counterInterval);
            });
            $counterButtons.children('.invest-form__counter-button_bottom').on("mouseup mouseleave", () => {
                clearInterval(this.counterInterval);
            });

        }
    }

</script>

<style src="./style.css" >

</style>