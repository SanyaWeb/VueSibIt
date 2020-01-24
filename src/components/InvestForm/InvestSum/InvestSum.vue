<template>
    <div>
        <div class="invest-form__field">
            <label class="invest-form__row">
                <div class="invest-form__left-col">
                    <span class="invest-form__field-name">Сумма инвестиции</span>
                </div>
                <div class="invest-form__right-col">
                    <div class="invest-form__field-val invest-form__field-val_invest">
                        <input type="text" name="sumInv" class="invest-form__field-input" autocomplete="off" v-model="sumInv" @input="sumInvInput" >
                        <div class="error-message" ></div>
                    </div>
                </div>
            </label>
        </div>
        <div class="invest-form__field">
            <label class="invest-form__row">
                <div class="invest-form__left-col">
                    <span class="invest-form__field-name">Мультипликатор</span>
                </div>
                <div class="invest-form__right-col">
                    <div class="invest-form__field-val invest-form__field-val_multiplier">
                        <input type="text" name="mult" class="invest-form__field-input invest-form__field-input_slider_mult" v-model="mult" autocomplete="off">
                        <div class="error-message"></div>
                    </div>
                    <span class="invest-form__real-invest"> = <span class="invest-form__real-invest-val">{{realInvest}}</span></span>
                </div>
                <div class="invest-form-mult-slider-wrap">
                    <div id="invest-form-mult-slider">
                        <div class="slider-scale"></div>
                    </div>
                </div>
            </label>
        </div>
    </div>
</template>

<script>

    import $ from "jquery";

    export default {
        data: function() {
            return {
                fieldErrorTimeOut: null,
                investForm: null,
            }
        },
        computed: {
            sumInv: {
                get() {
                    const $element = $("#invest-form").find("input[name=sumInv]");
                    this.hideError($element);
                    if(!this.$store.getters.getField.result.valid) {
                        this.showError(this.$store.getters.getField, $element, 4000);
                    }
                    return this.$store.getters.fieldVal;
                },
                set(value) {
                    this.$store.commit("formatField", {
                        value: value,
                        thisInput: this.investForm.find("input[name=sumInv]").get(0)
                    });
                }
            },
            mult: {
                get() {
                    const $element = $("#invest-form").find("input[name=mult]");
                    this.hideError($element);
                    if(!this.$store.getters.multField.result.valid) {
                        this.showError(this.$store.getters.multField, $element, 4000);
                    }
                    return this.$store.getters.multVal;
                },
                set(value) {
                    this.$store.commit("multFormatField", {
                        value: value,
                        thisInput: this.investForm.find("input[name=mult]").get(0)
                    });
                }
            },
            realInvest() {
                if(this.mult && this.sumInv) {
                    let mult = this.mult.replace(/[^0-9+]/g, ''),
                        sumInv = this.sumInv.replace(/[^0-9+]/g, '');
                    return String(Number(mult) * Number(sumInv)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                }

                return 0;
            },

        },
        components: {

        },
        methods: {

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
            },

            hideAllErrors() {
                clearTimeout(this.fieldErrorTimeOut);
                const $elements = this.investForm.find("input[type=text]");
                const _this = this;
                $elements.each( function() {
                    _this.hideError($(this));
                });
            },
            sumInvInput() {
                this.$store.dispatch("sumInvInput");
            }
        },
        mounted: function() {
            this.investForm = $("#invest-form");
            this.$store.dispatch("init", this.investForm.find("input[name=sumInv]").get(0));
            this.$store.dispatch("multInit", this.investForm.find("input[name=mult]").get(0));



            const slider = $("#invest-form-mult-slider");
            let slideScale = [1,5,20,40];

            slideScale.forEach((val)=>{
                slider.children('.slider-scale').append(
                    '<span class="slider-scale__item slider-scale__item_left_'+ val +'">'+ val +'</span>'
                );
                slider.find('.slider-scale__item_left_'+ val).css({
                    left: (val-1) * 100/39 + "%",
                });
            });
            slider.slider({
                range: "min",
                value: 40,
                min: 1,
                max: 40,
                step: 1,
                slide: ( event, ui ) => {
                    this.mult = String("$" + ui.value);
                }
            });
            $(document).on('click', function (e) {
                if(!$(e.target).hasClass('invest-form__field-input_slider_mult')
                    && !$(e.target).hasClass('invest-form-mult-slider-wrap'))
                {
                    slider.parent('.invest-form-mult-slider-wrap').css("display", "none");
                }
            })
        }
    }
</script>